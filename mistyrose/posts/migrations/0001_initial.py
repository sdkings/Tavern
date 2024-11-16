# Generated by Django 5.1.2 on 2024-11-15 23:15

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
            name='Like',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('url', models.URLField(editable=False, unique=True)),
                ('published', models.DateTimeField(auto_now_add=True, null=True)),
                ('object_url', models.URLField(blank=True, null=True)),
                ('object_id', models.UUIDField(blank=True, null=True)),
                ('author_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='users.author')),
                ('content_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('type', models.CharField(choices=[('post', 'Post')], default='post', max_length=10)),
                ('title', models.CharField(blank=True, default='No Title', max_length=200, null=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('url', models.URLField(editable=False, unique=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('content_type', models.CharField(choices=[('text/plain', 'Plain'), ('text/markdown', 'Markdown'), ('image/png', 'PNG Image'), ('image/jpeg', 'JPEG Image'), ('image/gif', 'GIF Image')], default='text/plain', max_length=50)),
                ('content', models.TextField(blank=True, null=True)),
                ('published', models.DateTimeField(auto_now=True)),
                ('visibility', models.CharField(choices=[('FRIENDS', 'Friends'), ('PUBLIC', 'Public'), ('UNLISTED', 'Unlisted'), ('DELETED', 'Deleted'), ('SHARED', 'Shared')], default='PUBLIC', max_length=10)),
                ('original_url', models.JSONField(blank=True, null=True)),
                ('author_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='users.author')),
            ],
            options={
                'ordering': ['-published'],
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('url', models.URLField(editable=False, unique=True)),
                ('published', models.DateTimeField(auto_now_add=True)),
                ('comment', models.TextField()),
                ('content_type', models.CharField(blank=True, max_length=50, null=True)),
                ('page', models.URLField(blank=True, null=True)),
                ('author_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='users.author')),
                ('post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='posts.post')),
            ],
            options={
                'ordering': ['-published'],
            },
        ),
    ]
