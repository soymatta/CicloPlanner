from db.db import app, db, ma

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(30))
    password = db.Column(db.String(30), nullable=False)
    image = db.Column(db.String(300), nullable=False, default='profilePhotos/default.jpg') 

    def __init__(self, username,  password):
        self.username = username
        self.password = password

class UsersSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Users

user_schema = UsersSchema()
users_schema = UsersSchema(many=True)

with app.app_context():
    db.create_all()