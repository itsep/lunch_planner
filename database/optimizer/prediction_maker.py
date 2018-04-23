import tensorflow as tf
from tensorflow.python.framework.errors_impl import NotFoundError

vector_dimension = 1000

def train(member, time, location):
    with tf.variable_scope('vsf-experts', reuse=tf.AUTO_REUSE):
        center_member = tf.get_variable(name=member + '_center', shape=[vector_dimension], dtype=tf.float32, initializer=tf.random_normal_initializer)
        context_member = tf.get_variable(name=member + 'context', shape=[vector_dimension],
                                         dtype=tf.float32, initializer=tf.random_normal_initializer)

        context_time = tf.get_variable(name=time, shape=[vector_dimension], dtype=tf.float32, initializer=tf.random_normal_initializer)
        context_location = tf.get_variable(name=location, shape=[vector_dimension], dtype=tf.float32, initializer=tf.random_normal_initializer)

    # needed for probability of context_value to appear in context of member
    denuminator = tf.exp(tf.reduce_sum(context_time * center_member)) + tf.exp(tf.reduce_sum(context_location * center_member))
    time_numerator = tf.exp(tf.reduce_sum(context_time * center_member))
    location_numerator = tf.exp(tf.reduce_sum(context_location * center_member))

    # sum of probabilitys and context vectors
    expectation_of_context_member = tf.divide(time_numerator, denuminator)*context_time + tf.divide(location_numerator, denuminator)*context_location

    sess = tf.Session()
    init = tf.global_variables_initializer()
    sess.run(init)

    # define the loss function:
    distance = tf.subtract(context_member, expectation_of_context_member)**2

    # define the training step:
    train_step = tf.train.GradientDescentOptimizer(0.1).minimize(distance)
    n_iters = 10

    saver = tf.train.Saver()
    try:
        saver.restore(sess, "/tmp/model.ckpt")
    except NotFoundError:
        print('New variable save file will be created')
    # train for n_iter iterations
    for _ in range(n_iters):
        sess.run(train_step)
        print(tf.reduce_sum(distance).eval(session=sess))
    saver.save(sess, '/tmp/model.ckpt')

train('sebi', '1230', 'sebisHaus')