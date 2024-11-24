# Generated by Django 5.1.2 on 2024-11-24 23:19

import datetime
import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Inbox',
            fields=[
                ('inbox_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.CharField(choices=[('follow', 'Follow request'), ('like', 'Like'), ('comment', 'Comment'), ('post', 'Post')], max_length=100)),
                ('created_at', models.DateTimeField(default=datetime.datetime.now, verbose_name='date requested')),
                ('object_id', models.UUIDField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='author', to='users.author')),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
            ],
        ),
    ]
