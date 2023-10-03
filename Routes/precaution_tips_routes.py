from flask import blueprints, request, jsonify
from bicicletas.Models.alarms_models import PrecautionTips, precautionTip_schema, precautionTips_schema, db

precautionTips_routes = blueprints.Blueprint("precautiontips", __name__)

#--------------------------------------------- REPORTES -----------------------------------------------

#-------GET-----------    
@precautionTips_routes.route('/get', methods=['GET'])
def get_precaution_tips():
    reportes = PrecautionTips.query.all()
    return jsonify(precautionTips_schema.dump(reportes))

#-------POST-----------
@precautionTips_routes.route('/post', methods=['POST'])
def create_precaution_tip():
    try:
        data = request.get_json()
        db.session.add(PrecautionTips(**data))
        db.session.commit()

        return precautionTip_schema.jsonify(PrecautionTips(**data)), 201
    except Exception as e:
        return jsonify({"error": "Error al crear el Consejo de precaución", "details": str(e)}), 400

#-------PUT-----------
@precautionTips_routes.route('/put/<id>', methods=['PUT'])
def update_precaution_tip(id):
    try:
        precautionTip = PrecautionTips.query.get(id)
        if not precautionTip:
                return jsonify({"error": "Consejo de precaución no encontrado"}), 404

        data = request.json
            
        for k, v in data.items():
            setattr(precautionTip, k, v)

        db.session.commit()

        return jsonify({"mensaje": "Consejo de precaución actualizado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al actualizar el consejo de precaución", "details": str(e)}), 500

#-------DELETE--------
@precautionTips_routes.route('/delete/<id>', methods=['DELETE'])
def delete_precaution_tip(id):
    try:
        precautionTip = PrecautionTips.query.get(id)

        if not precautionTip:
            return jsonify({"error": "Consejo de precaución no encontrado"}), 404

        db.session.delete(precautionTip)
        db.session.commit()

        return jsonify({"mensaje": "Consejo de precaución eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al eliminar el consejo de precaución", "details": str(e)}), 500
