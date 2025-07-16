from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    reserved_slots = models.PositiveIntegerField(default=0)
    total_slots = models.PositiveIntegerField(default=10)  # ✅ valeur par défaut ajoutée

    def reserve_slot(self):
        if self.reserved_slots < self.total_slots:
            self.reserved_slots += 1
            self.save()
            return True
        return False

    def cancel_reservation(self):
        if self.reserved_slots > 0:
            self.reserved_slots -= 1
            self.save()
            return True
        return False
