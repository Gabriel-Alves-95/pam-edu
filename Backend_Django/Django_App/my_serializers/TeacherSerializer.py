from rest_framework import serializers
from Django_App.models.Teacher import Teacher

class TeacherSerializer(serializers.ModelSerializer):

    class Meta:        
        model = Teacher
        fields = '__all__'

    def to_representation(self, instance):
        representation = dict()           
        user = dict()
        teacher = dict()

        user["id"] = instance.teacher.user.id
        user["username"] = instance.teacher.user.username
        user["password"] = instance.teacher.user.password
        user["email"] = instance.teacher.user.email
        user["first_name"] = instance.teacher.user.first_name
        user["last_name"] = instance.teacher.user.last_name
        
        teacher["id"] = instance.teacher.id
        teacher["user"] = user
        teacher["birthday"] = instance.teacher.birthday if instance.teacher.birthday else None
        teacher["phone_number"] = instance.teacher.phone_number if instance.teacher.phone_number else None
        teacher["address"] = instance.teacher.address if instance.teacher.address else None
        teacher["photo"] = instance.teacher.photo if instance.teacher.photo else None
        teacher["created_at"] = instance.teacher.created_at
        teacher["updated_at"] = instance.teacher.updated_at                

        representation["id"] = instance.id
        representation["teacher"] = teacher

        return representation