import tensorflow as tf
from tensorflow.python.framework.errors_impl import NotFoundError

vector_dimension = 1000
sess = tf.Session()
restore_path = "/tmp/model.ckpt"

def get_distance(member, time, location):
    with tf.variable_scope('vsf-experts', reuse=tf.AUTO_REUSE):
        center_member = tf.get_variable(name=member + '_center', shape=[vector_dimension], dtype=tf.float32, initializer=tf.random_normal_initializer)
        context_member = tf.get_variable(name=member + '_context', shape=[vector_dimension],
                                         dtype=tf.float32, initializer=tf.random_normal_initializer)

        context_time = tf.get_variable(name=time, shape=[vector_dimension], dtype=tf.float32, initializer=tf.random_normal_initializer)
        context_location = tf.get_variable(name=location, shape=[vector_dimension], dtype=tf.float32, initializer=tf.random_normal_initializer)

    # needed for probability of context_value to appear in context of member
    denuminator = tf.exp(tf.reduce_sum(context_time * center_member)) + tf.exp(tf.reduce_sum(context_location * center_member))
    time_numerator = tf.exp(tf.reduce_sum(context_time * center_member))
    location_numerator = tf.exp(tf.reduce_sum(context_location * center_member))

    # sum of probabilitys and context vectors
    expectation_of_context_member = tf.divide(time_numerator, denuminator)*context_time + tf.divide(location_numerator, denuminator)*context_location

    init = tf.global_variables_initializer()
    sess.run(init)

    # define the loss function:
    distance = tf.map_fn(tf.square, tf.subtract(context_member, expectation_of_context_member))

    saver = tf.train.Saver()
    try:
        saver.restore(sess, restore_path)
    except NotFoundError:
        print('New key value will be created.')
    return distance

def train(member, time, location):
    distance = get_distance(member, time, location)
    # define the training step:
    train_step = tf.train.GradientDescentOptimizer(0.1).minimize(distance)

    saver = tf.train.Saver()
    try:
        saver.restore(sess, restore_path)
    except NotFoundError:
        print('New key value will be created.')

    sess.run(train_step)
    saver.save(sess, restore_path)

print(tf.reduce_sum(get_distance('seb', '1230', 'myHome')).eval(session=sess))
for _ in range(10):
    train('seb', '1230', 'myHome')
print(tf.reduce_sum(get_distance('seb', '1230', 'myHome')).eval(session=sess))