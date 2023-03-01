from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

ROLE_CHOICE = (
    (1, 'Admin'),
    (2, 'Professor'),
    (3, 'Responsável'),
    (4, 'Aluno')
)

CYCLE_CHOICE = (
    (1, 'Pré-Escola'),
    (2, 'Fundamental I'),
    (3, 'Fundamental II'),
    (4, 'Ensino Médio')
)

LEVEL_CHOICE = (
    (1, 'Jardim 1'),
    (2, 'Jardim 2'),
    (3, 'Jardim 3'),
    (4, '1º Ano'),
    (5, '2º Ano'),
    (6, '3º Ano'),
    (7, '4º Ano'),
    (8, '5º Ano')
)

from .Profile import Profile
from .Teacher import Teacher
from .AdultInCharge import AdultInCharge
from .Student import Student
from .Course import Course
from .Enrollment import Enrollment