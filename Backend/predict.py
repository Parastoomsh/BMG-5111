import sys
from keras import models
import tensorflow as tf
import numpy as np

def binary_fbeta(ytrue, ypred, beta=1, threshold=0.5, epsilon=1e-16):
    # epsilon is set so as to avoid division by zero error

    beta_squared = beta**2  # squaring beta

    # casting ytrue and ypred as float dtype
    ytrue = tf.cast(ytrue, tf.float32)
    ypred = tf.cast(ypred, tf.float32)

    # setting values of ypred greater than the set threshold to 1 while those lesser to 0
    ypred = tf.cast(tf.greater_equal(
        ypred, tf.constant(threshold)), tf.float32)

    tp = tf.reduce_sum(ytrue*ypred)  # calculating true positives
    # calculating predicted positives
    predicted_positive = tf.reduce_sum(ypred)
    actual_positive = tf.reduce_sum(ytrue)  # calculating actual positives

    precision = tp/(predicted_positive+epsilon)  # calculating precision
    recall = tp/(actual_positive+epsilon)  # calculating recall

    # calculating fbeta
    fb = (1+beta_squared)*precision*recall / \
        (beta_squared*precision + recall + epsilon)
    return fb

if __name__ == "__main__":
    try:
       if(len(sys.argv)>8):
            model = models.load_model('binary_f1_95_36', custom_objects={
                          "binary_fbeta": binary_fbeta})
            #print ("Hi" + " " + sys.argv[1] + sys.argv[2] + sys.argv[3] + sys.argv[4] + sys.argv[5] + sys.argv[6] + sys.argv[7] + sys.argv[8])
            concave_worst = float(sys.argv[1])
            concave_std = float(sys.argv[2])
            texture_worst = float(sys.argv[3])
            smooth_worst = float(sys.argv[4])
            symm_worst = float(sys.argv[5])
            symm_mean = float(sys.argv[6])
            radius_std = float(sys.argv[7])
            compac_std = float(sys.argv[8])
            fm_list = [concave_worst, radius_std, texture_worst,
                        smooth_worst, symm_worst, concave_std, symm_mean, compac_std]
            fm = np.array(fm_list)
            fm = fm.reshape(1, 8)
            result = model.predict(fm,verbose=0)
            per_result = float(result[0])*100
            print(per_result)
            exit(0)
       else:
            raise Exception("Input parameter missing") 
    except Exception as e:
        print(str(e))
        exit(1)
