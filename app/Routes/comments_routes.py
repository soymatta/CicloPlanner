from flask import blueprints, request, jsonify
from Models.comments_models import Comments, CommentsSchema, db

comments_routes = blueprints.Blueprint("comments", __name__)

#--------------------------------------------- REPORTES -----------------------------------------------

#-------GET-----------    
@comments_routes.route('/get', methods=['GET'])
def get_comments():
    comments = Comments.query.all()
    return jsonify(CommentsSchema.dump(comments))

#-------POST-----------
@comments_routes.route('/post', methods=['POST'])
def create_comment():
    try:
        data = request.get_json()
        db.session.add(Comments(**data))
        db.session.commit()

        return comentario_schema.jsonify(Comments(**data)), 201
    except Exception as e:
        return jsonify({"error": "Error al crear el comentario", "details": str(e)}), 400

#-------PUT-----------
@comments_routes.route('/put/<id>', methods=['PUT'])
def update_comment(id):
    try:
        comentario = Comments.query.get(id)
        if not comentario:
                return jsonify({"error": "Comentario no encontrado"}), 404

        data = request.json
            
        for k, v in data.items():
            setattr(comentario, k, v)

        db.session.commit()

        return jsonify({"mensaje": "Comentario actualizado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al actualizar el Comentario", "details": str(e)}), 500

#-------DELETE--------
@comments_routes.route('/delete/<id>', methods=['DELETE'])
def delete_comment(id):
    try:
        comentario = Comments.query.get(id)

        if not comentario:
            return jsonify({"error": "Comentario no encontrado"}), 404

        db.session.delete(comentario)
        db.session.commit()

        return jsonify({"mensaje": "Comentario eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al eliminar el Comentario", "details": str(e)}), 500
