from django.db import models

# Create your models here.
class Tasks(models.Model):
    msg = models.CharField(max_length=500)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.msg
        