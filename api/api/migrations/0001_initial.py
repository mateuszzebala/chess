# Generated by Django 4.0 on 2024-04-01 17:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChessGame',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gameStart', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('waiting', 'Waiting for start'), ('playing', 'During play'), ('ended', 'Game ended')], max_length=8)),
                ('whiteTime', models.IntegerField()),
                ('blackTime', models.IntegerField()),
                ('whitesMove', models.BooleanField(default=True)),
                ('blackPlayer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='blackPlayer', to='auth.user')),
                ('whitePlayer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='whitePlayer', to='auth.user')),
                ('winner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='winner', to='auth.user')),
            ],
        ),
    ]
