from flask import Blueprint, request, jsonify
from Models.comments_models import Comments, CommentsSchema
from db.db import db

comments_routes = Blueprint("comments", __name__)

# ------- GET -----------
@comments_routes.route('/get', methods=['GET'])
def get_comments():
    comments = Comments.query.all()
    comments_schema = CommentsSchema(many=True)
    return jsonify(comments_schema.dump(comments)), 200

# ------- POST -----------
@comments_routes.route('/post', methods=['POST'])
def create_comment():
    try:
        data = request.get_json()
        comment = Comments(**data)
        db.session.add(comment)
        db.session.commit()
        return CommentsSchema().jsonify(comment), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al crear el comentario", "details": str(e)}), 400

# ------- PUT -----------
@comments_routes.route('/put/<int:id>', methods=['PUT'])
def update_comment(id):
    try:
        comment = Comments.query.get(id)
        if not comment:
            return jsonify({"error": "Comentario no encontrado"}), 404

        data = request.get_json()

        for key, value in data.items():
            setattr(comment, key, value)

        db.session.commit()

        return jsonify({"mensaje": "Comentario actualizado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al actualizar el comentario", "details": str(e)}), 500

# ------- DELETE -----------
@comments_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_comment(id):
    try:
        comment = Comments.query.get(id)

        if not comment:
            return jsonify({"error": "Comentario no encontrado"}), 404

        db.session.delete(comment)
        db.session.commit()

        return jsonify({"mensaje": "Comentario eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al eliminar el comentario", "details": str(e)}), 500
