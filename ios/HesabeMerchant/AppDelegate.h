#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import "RNSplashScreen.h"
#import <React/RCTRootView.h>


@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
{
  NSDictionary *options;
  UIViewController *viewController;
  RCTRootView *rootView ;
}
@property (nonatomic, strong) RCTBridge *bridge;
- (void) goToReactView : (NSString * )Token : (NSString *)RefreshToken : (NSString *)TokenExpires :(NSString *)TokenType :(NSString *)UserName :(NSString *)Password :(NSString *)currentlanguage ;
- (void) goToNativeView;



@property (nonatomic, strong) UIWindow *window;

@end
