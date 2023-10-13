from db.db import app, db, ma

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=True)
    date = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, content, date, user_id):
        self.content = content
        self.date = date
        self.user_id = user_id

class CommentsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comments

comment_schema = CommentsSchema()
comments_schema = CommentsSchema(many=True)

with app.app_context():
    db.create_all()