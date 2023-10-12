from flask import jsonify, request, Blueprint
from Models.routes_models import Routes, RoutesSchema
from db.db import db

routes_routes = Blueprint("routes", __name__)

# ------- GET -----------
@routes_routes.route('/get', methods=['GET'])
def get_routes():
    routes = Routes.query.all()
    routes_schema = RoutesSchema(many=True)
    return jsonify(routes_schema.dump(routes)), 200

# ------- POST -----------
@routes_routes.route('/post', methods=['POST'])
def create_route():
    try:
        data = request.get_json()
        route = Routes(**data)
        db.session.add(route)
        db.session.commit()
        return RoutesSchema().jsonify(route), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al crear la ruta", "details": str(e)}), 400

# ------- PUT -----------
@routes_routes.route('/put/<int:id>', methods=['PUT'])
def update_route(id):
    try:
        route = Routes.query.get(id)
        if not route:
            return jsonify({"error": "Ruta no encontrada"}), 404

        data = request.get_json()

        for key, value in data.items():
            setattr(route, key, value)

        db.session.commit()

        return jsonify({"mensaje": "Ruta actualizada correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al actualizar la ruta", "details": str(e)}), 500

# ------- DELETE -----------
@routes_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_route(id):
    try:
        route = Routes.query.get(id)

        if not route:
            return jsonify({"error": "Ruta no encontrada"}), 404

        db.session.delete(route)
        db.session.commit()

        return jsonify({"mensaje": "Ruta eliminada correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al eliminar la ruta", "details": str(e)}), 500
