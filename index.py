# Copyright 2022 <ZHANG XiDuo, ZHAX18089306>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask, request, redirect, url_for
from flask import render_template
from flask import g
from .database import Database
import random

app = Flask(__name__, static_url_path="", static_folder="static")


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        g._database = Database()
    return g._database


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.disconnect()


@app.route('/')
def home():
    random_animals = random.sample(get_db().get_animaux(), k=5)
    return render_template('home.html', animals = random_animals)

@app.route('/adopt')
def need_adopt():
    return render_template('adoption.html')

@app.route('/animal/<id>')
def animal_with_id(id):
    animal = get_db().get_animal(id)
    return render_template('animalshow.html', animal = animal)

@app.route('/search')
def search():
    query = request.args.get('query').lower()
    animals = get_db().get_animaux()
    filter_animals = _filter_animals(animals, query)
    return render_template('result.html', animals = filter_animals)

@app.route("/submit", methods=["post"])
def submit():
    name = request.form["animal_name"]
    specie = request.form["animal_specie"]
    race = request.form["animal_race"]
    age = request.form["animal_age"]
    email = request.form["email"]
    addresse = request.form["addresse"]
    city = request.form["city"]
    postal = request.form["postal"]
    description = request.form["description"]

    animal_id = get_db().add_animal(name, specie, race, age, description, email, addresse, city, postal)

    return redirect(url_for('animal_with_id', id=animal_id))

@app.errorhandler(404)
def not_found(e):
    return render_template("404.html"), 404


def _filter_animals(animals, query):
    filter_animals = []
    for animal in animals:
        if animal['espece'].lower() in query or animal['nom'].lower() in query:
            filter_animals.append(animal)

    return filter_animals