from flask import blueprints, request, jsonify
from Models.routes_models import Routes, RoutesSchema, db

routes_routes = blueprints.Blueprint("routes", __name__)

#--------------------------------------------- REPORTES -----------------------------------------------

#-------GET-----------    
@routes_routes.route('/get', methods=['GET'])
def get_routes():
    reportes = Routes.query.all()
    return jsonify(RoutesSchema.dump(reportes))

#-------POST-----------
@routes_routes.route('/post', methods=['POST'])
def create_ruta():
    try:
        data = request.get_json()
        db.session.add(Routes(**data))
        db.session.commit()

        return ruta_schema.jsonify(Routes(**data)), 201
    except Exception as e:
        return jsonify({"error": "Error al crear la ruta", "details": str(e)}), 400

#-------PUT-----------
@routes_routes.route('/put/<id>', methods=['PUT'])
def update_ruta(id):
    try:
        ruta = Routes.query.get(id)
        if not ruta:
                return jsonify({"error": "Ruta no encontrada"}), 404

        data = request.json
            
        for k, v in data.items():
            setattr(ruta, k, v)

        db.session.commit()

        return jsonify({"mensaje": "Ruta actualizada correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al actualizar la ruta", "details": str(e)}), 500

#-------DELETE--------
@routes_routes.route('/delete/<id>', methods=['DELETE'])
def delete_reporte(id):
    try:
        ruta = Routes.query.get(id)

        if not ruta:
            return jsonify({"error": "Ruta no encontrada"}), 404

        db.session.delete(ruta)
        db.session.commit()

        return jsonify({"mensaje": "Ruta eliminada correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al eliminar la ruta", "details": str(e)}), 500
