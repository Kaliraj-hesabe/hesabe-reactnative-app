//
//  LastViewController.m
//  Sample
//
//  Created by pramod yadav on 07/08/20.
//

#import "LastViewController.h"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "AppDelegate.h"

@interface LastViewController ()

@end

@implementation LastViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}


- (IBAction)StartBtnClick:(id)sender {
  NSLog(@"Hello");
  AppDelegate *appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
   [appDelegate goToReactView];
   //[self dismissViewControllerAnimated:true completion:nil];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
