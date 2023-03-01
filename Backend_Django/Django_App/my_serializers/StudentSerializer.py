from rest_framework import serializers
from Django_App.models.Student import Student

class StudentSerializer(serializers.ModelSerializer):

    class Meta:        
        model = Student
        fields = '__all__'

    def to_representation(self, instance):
        representation = dict() 

        representation["id"] = instance.id
        representation["student"] = {
            "id": instance.student.id,
            "user": {
                "id": instance.student.user.id,
                "username": instance.student.user.username,
                "password": instance.student.user.password,
                "email": instance.student.user.email,
                "first_name": instance.student.user.first_name,
                "last_name": instance.student.user.last_name
            },
            "birthday": instance.student.birthday if instance.student.birthday else None,
            "phone_number": instance.student.phone_number if instance.student.phone_number else None,
            "address": instance.student.address if instance.student.address else None,
            "photo": instance.student.photo if instance.student.photo else None,
            "created_at": instance.student.created_at,
            "updated_at": instance.student.updated_at
        } 

        if instance.adult_in_charge:
            representation["adult_in_charge"] = {
                "id": instance.adult_in_charge.id,
                "user": {
                    "id": instance.adult_in_charge.adult.user.id,
                    "username": instance.adult_in_charge.adult.user.username,
                    "password": instance.adult_in_charge.adult.user.password,
                    "email": instance.adult_in_charge.adult.user.email,
                    "first_name": instance.adult_in_charge.adult.user.first_name,
                    "last_name": instance.adult_in_charge.adult.user.last_name
                },
                "birthday": instance.adult_in_charge.adult.birthday if instance.adult_in_charge.adult.birthday else None,
                "phone_number": instance.adult_in_charge.adult.phone_number if instance.adult_in_charge.adult.phone_number else None,
                "address": instance.adult_in_charge.adult.address if instance.adult_in_charge.adult.address else None,
                "photo": instance.adult_in_charge.adult.photo if instance.adult_in_charge.adult.photo else None,
                "created_at": instance.adult_in_charge.adult.created_at,
                "updated_at": instance.adult_in_charge.adult.updated_at
            }
        else: 
            representation["adult_in_charge"] = None
        
        return representation