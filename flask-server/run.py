from app import app
from app import db
from api.routes import api

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        app.register_blueprint(api)
    app.run(debug=True)