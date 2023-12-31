"""empty message

Revision ID: 9bdff9fcf059
Revises: 66485bbf778b
Create Date: 2023-12-07 23:44:50.932655

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '9bdff9fcf059'
down_revision = '66485bbf778b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fullname', sa.String(length=64), nullable=True))
        batch_op.drop_index('ix_user_username')
        batch_op.create_index(batch_op.f('ix_user_fullname'), ['fullname'], unique=True)
        batch_op.drop_column('username')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', mysql.VARCHAR(length=64), nullable=True))
        batch_op.drop_index(batch_op.f('ix_user_fullname'))
        batch_op.create_index('ix_user_username', ['username'], unique=False)
        batch_op.drop_column('fullname')

    # ### end Alembic commands ###
