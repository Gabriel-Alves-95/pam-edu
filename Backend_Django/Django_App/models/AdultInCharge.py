from Django_App.models import *

class AdultInCharge(models.Model):
    adult = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return self.adult.user.get_full_name()