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

from flask import Flask, request
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
def animal_id(id):
    animal = get_db().get_animal(id)
    return render_template('animalshow.html', animal = animal)

@app.route('/animal/search/<id>')
def search(id):
    animal = get_db().get_animal(id)
    return render_template('animalshow.html', animal = animal)

@app.errorhandler(404)
def not_found(e):
    return render_template("404.html"), 404