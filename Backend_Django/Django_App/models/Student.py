from Django_App.models import *

class Student(models.Model):
    student = models.ForeignKey(Profile, on_delete=models.CASCADE)
    adult_in_charge = models.ForeignKey(AdultInCharge, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.student.user.get_full_name()