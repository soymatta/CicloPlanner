from db.db import app, db, ma

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(30))
    email = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(30), nullable=False)
    image = db.Column(db.String(300), nullable=False) 
    address = db.Column(db.String(300))

    def __init__(self, username, email, password, image, address):
        self.username = username
        self.email = email
        self.password = password
        self.image = image
        self.address = address

class UsersSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Users

user_schema = UsersSchema()
users_schema = UsersSchema(many=True)

with app.app_context():
    db.create_all()