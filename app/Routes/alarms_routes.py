from flask import Blueprint, request, jsonify
from Models.alarms_models import Alarms, AlarmsSchema
from db.db import db

alarms_routes = Blueprint("alarms", __name__)

# ------- GET -----------
@alarms_routes.route('/get', methods=['GET'])
def get_alarms():
    alarms = Alarms.query.all()
    alarms_schema = AlarmsSchema(many=True)
    return jsonify(alarms_schema.dump(alarms)), 200

# ------- POST -----------
@alarms_routes.route('/post', methods=['POST'])
def create_alarm():
    try:
        data = request.get_json()
        alarm = Alarms(**data)
        db.session.add(alarm)
        db.session.commit()
        return AlarmsSchema().jsonify(alarm), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al crear el Consejo de precaución", "details": str(e)}), 400

# ------- PUT -----------
@alarms_routes.route('/put/<int:id>', methods=['PUT'])
def update_alarm(id):
    try:
        alarm = Alarms.query.get(id)
        if not alarm:
            return jsonify({"error": "Consejo de precaución no encontrado"}), 404

        data = request.get_json()

        for key, value in data.items():
            setattr(alarm, key, value)

        db.session.commit()

        return jsonify({"mensaje": "Consejo de precaución actualizado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al actualizar el consejo de precaución", "details": str(e)}), 500

# ------- DELETE -----------
@alarms_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_alarm(id):
    try:
        alarm = Alarms.query.get(id)

        if not alarm:
            return jsonify({"error": "Consejo de precaución no encontrado"}), 404

        db.session.delete(alarm)
        db.session.commit()

        return jsonify({"mensaje": "Consejo de precaución eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al eliminar el consejo de precaución", "details": str(e)}), 500
