# Generated by Django 4.1.7 on 2023-02-26 21:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Django_App', '0003_student_adult'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='adult',
            new_name='adultInCharge',
        ),
    ]
