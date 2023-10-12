from flask import jsonify, request, Blueprint
from Models.users_models import Users, UsersSchema
from db.db import db

users_routes = Blueprint("users", __name__)

# ------- GET -----------
@users_routes.route('/get', methods=['GET'])
def get_users():
    users = Users.query.all()
    users_schema = UsersSchema(many=True)
    return jsonify(users_schema.dump(users)), 200

# ------- POST -----------
@users_routes.route('/post', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        user = Users(**data)
        db.session.add(user)
        db.session.commit()
        return UsersSchema().jsonify(user), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al crear el usuario", "details": str(e)}), 400

# ------- PUT -----------
@users_routes.route('/put/<int:id>', methods=['PUT'])
def update_user(id):
    try:
        user = Users.query.get(id)
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        data = request.get_json()

        for key, value in data.items():
            setattr(user, key, value)

        db.session.commit()

        return jsonify({"mensaje": "Usuario actualizado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al actualizar el usuario", "details": str(e)}), 500

# ------- DELETE -----------
@users_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = Users.query.get(id)

        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        db.session.delete(user)
        db.session.commit()

        return jsonify({"mensaje": "Usuario eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al eliminar el usuario", "details": str(e)}), 500
