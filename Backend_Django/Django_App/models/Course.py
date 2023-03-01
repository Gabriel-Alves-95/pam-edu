from Django_App.models import *

class Course(models.Model):
    name = models.CharField(max_length=30)
    year = models.IntegerField(null=True, blank=True)
    cycle = models.IntegerField(choices=CYCLE_CHOICE, default=None)
    level = models.IntegerField(choices=LEVEL_CHOICE, default=None)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student, through='Enrollment')

    def __str__(self):
        return self.name