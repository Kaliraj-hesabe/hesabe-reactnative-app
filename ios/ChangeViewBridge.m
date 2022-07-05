//
//  ChangeViewBridge.m
//  Sample
//
//  Created by pramod yadav on 07/08/20.
//

#import "ChangeViewBridge.h"

//#import "RegisterBridge.h"
//#import "FidoTestProject-Swift.h"
#import "AppDelegate.h"

@implementation ChangeViewBridge

// reference "ChangeViewBridge" module in index.ios.js
RCT_EXPORT_MODULE(ChangeViewBridge);

RCT_EXPORT_METHOD(changeToNativeView) {
  NSLog(@"RN binding - Native View - Loading MyViewController.swift");
  dispatch_async(dispatch_get_main_queue(), ^{
      AppDelegate *appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
       [appDelegate goToNativeView];
  });
 
}


RCT_EXPORT_METHOD(updateLanguage : (NSString *) value) {
  NSLog(@"RN binding - Native View - Loading MyViewController.swift");
  dispatch_async(dispatch_get_main_queue(), ^{
    NSLog(@"%@", value);
    [[NSUserDefaults standardUserDefaults] setObject:value forKey:@"Language"];
    [[NSUserDefaults standardUserDefaults] synchronize];
   
  });
 
}

RCT_EXPORT_METHOD(faceData : (NSString *) value) {
  //NSLog(@"RN binding - Native View - Loading MyViewController.swift");
  dispatch_async(dispatch_get_main_queue(), ^{
    NSLog(@"%@", value);
    [[NSUserDefaults standardUserDefaults] setObject:value forKey:@"FaceData"];
    [[NSUserDefaults standardUserDefaults] synchronize];
   
  });
 
}


@end
