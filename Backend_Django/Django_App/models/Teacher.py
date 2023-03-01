from Django_App.models import *

class Teacher(models.Model):
    teacher = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):        
        return self.teacher.user.get_full_name()