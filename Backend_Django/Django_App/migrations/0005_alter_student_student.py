# Generated by Django 4.1.7 on 2023-02-26 23:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Django_App', '0004_rename_adult_student_adultincharge'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Django_App.profile'),
        ),
    ]
