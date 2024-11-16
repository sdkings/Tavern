# Generated by Django 5.1.2 on 2024-11-15 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Node',
            fields=[
                ('host', models.URLField()),
                ('username', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('is_whitelisted', models.BooleanField(default=False)),
                ('is_authenticated', models.BooleanField(default=True)),
            ],
        ),
    ]
