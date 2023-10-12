from flask import Flask, render_template

from db.db import app, db, ma
from Routes.users_routes import users_routes
from Routes.routes_routes import routes_routes
from Routes.alarms_routes import alarms_routes
from Routes.comments_routes import comments_routes

app.register_blueprint(users_routes, url_prefix="/users")
app.register_blueprint(routes_routes, url_prefix="/routes")
app.register_blueprint(alarms_routes, url_prefix="/alarms")
app.register_blueprint(comments_routes, url_prefix="/comments")

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

if __name__ == "__main__":
    app.run(debug=True, port=5000)
