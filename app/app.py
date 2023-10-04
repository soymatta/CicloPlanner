from flask import Flask, render_template

'''
from db.db import app
from Routes.users_routes import users_routes
from Routes.routes_routes import rutas_routes
from Gestion_para_ciclistas.Routes.alarms_routes import precautionTips_routes
from Routes.comments_routes import comments_routes

app.register_blueprint(users_routes, url_prefix="/users")
app.register_blueprint(rutas_routes, url_prefix="/routes")
app.register_blueprint(precautionTips_routes, url_prefix="/precaution_tips")
app.register_blueprint(comments_routes, url_prefix="/comments")
'''

def create_app():
    app = Flask(__name__)

    @app.route("/")
    def home():
        return render_template('home.html')

    @app.route("/community")
    def community():
        return render_template('community.html')
    
    @app.route("/login")
    def login():
        return render_template('login.html')
    
    @app.route("/register")
    def register():
        return render_template('register.html')
    
    return app

if __name__ == "__main__":
    create_app().run(debug=True)