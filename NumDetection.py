import cv2
import numpy as np
from numpy import array
import math
from sklearn.externals import joblib

def corners(cnt):
    
    cor = np.zeros((4,2),np.float32)
 
    mx=np.sum(cnt,axis=2)        

    cor[1] = cnt[np.argmin(mx)]
    cor[3] = cnt[np.argmax(mx)]    
    mn=np.diff(cnt)
    
    cor[0] = cnt[np.argmin(mn)]
    cor[2] = cnt[np.argmax(mn)]
    
    return cor
         

labels = np.loadtxt('classifications.txt',np.float32)

data_images =np.loadtxt('flattened_images.txt',np.float32)

labels= labels.reshape((labels.size, 1))

knn=cv2.ml.KNearest_create()

knn.train(data_images, cv2.ml.ROW_SAMPLE, labels)

img_w=20
img_h=30
ssz=9
sz_imw = 504 
kernal = cv2.getStructuringElement(cv2.MORPH_RECT,(3,3))
mat_sudoku=np.zeros((9,9),np.uint8)


def getNumbers (img):
    
    original1=img.copy()
    original2=img.copy()

    g = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    im = cv2.bilateralFilter(g,-1,35,3)

    imthresh = cv2.adaptiveThreshold(im,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY_INV,5,2)
    dilat= cv2.dilate(imthresh,kernal,iterations = 1)
    
    contours,_ = cv2.findContours(dilat,cv2.RETR_LIST,cv2.CHAIN_APPROX_SIMPLE)

    area=0
    acum=0
    c_sudoku=0

    for i in contours:

        area=cv2.contourArea(i)
        if area > acum:
            acum = area
            c_sudoku=i

    epsilon = 0.02*cv2.arcLength(c_sudoku,True)
    c_ajustado = cv2.approxPolyDP(c_sudoku,epsilon,True)

    corn = corners(c_ajustado)

    pts2 = np.array([[504,0],[0,0],[0,504],[504,504]],np.float32)

    pers = cv2.getPerspectiveTransform(corn,pts2)

    warp =cv2.warpPerspective(imthresh, pers,(504,504))

    warp= cv2.erode(warp1,kernal,iterations = 1)

    contours2,_ = cv2.findContours(warp,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
    area2=0 
    for j in contours2: 

        area2=cv2.contourArea(j)
        
        if 480 < area2 and area2 < 2400 :
            
            x,y,w,h = cv2.boundingRect(j)
            
            if h < 296 and h > 72:

                dig_rec1 = warp[y:y+h,x:x+w]

                dig_rec = cv2.resize(dig_rec1, (img_w, img_h))

                dig_rec= dig_rec.reshape((1,img_w*img_h))

                dig_rec = np.float32(dig_rec)
                

                ret, result, neighbours, dist = knn.findNearest(dig_rec, k = 2)
                result = chr(int(result[0][0]))

                posx = (x+(w/2))/56
                posy= (y+(h/2))/56          

                iposy=int(posy)
                iposx =int(posx) 
                
                if ord(result) > ord('9') or ord(result)<ord('0'):
                    result=0

                mat_sudoku[iposy,iposx]=result
                
    return x
