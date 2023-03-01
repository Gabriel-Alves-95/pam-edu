from rest_framework import serializers
from Django_App.models.AdultInCharge import AdultInCharge

class AdultInChargeSerializer(serializers.ModelSerializer): 
    
    class Meta:        
        model = AdultInCharge       
        fields = '__all__'

    def to_representation(self, instance):
        representation = dict()           
        user = dict()
        adult = dict()

        user["id"] = instance.adult.user.id
        user["username"] = instance.adult.user.username
        user["password"] = instance.adult.user.password
        user["email"] = instance.adult.user.email
        user["first_name"] = instance.adult.user.first_name
        user["last_name"] = instance.adult.user.last_name
        
        adult["id"] = instance.adult.id
        adult["user"] = user
        adult["birthday"] = instance.adult.birthday if instance.adult.birthday else None
        adult["phone_number"] = instance.adult.phone_number if instance.adult.phone_number else None
        adult["address"] = instance.adult.address if instance.adult.address else None
        adult["photo"] = instance.adult.photo if instance.adult.photo else None
        adult["created_at"] = instance.adult.created_at
        adult["updated_at"] = instance.adult.updated_at                

        representation["id"] = instance.id
        representation["adult"] = adult

        return representation