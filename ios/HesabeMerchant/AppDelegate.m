#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import "RNQuickActionManager.h"
#import <Firebase/Firebase.h>
#import <TrustKit/TrustKit.h>
#import <TrustKit/TSKPinningValidator.h>
#import <TrustKit/TSKPinningValidatorCallback.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
#import <HesabeMerchant-Swift.h>

#if RCT_DEV
#import <React/RCTDevLoadingView.h>
#endif

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate
@synthesize bridge;



- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  options = launchOptions;

  bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

  #if RCT_DEV
    [bridge moduleForClass:[RCTDevLoadingView class]];
  #endif


  rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                    moduleName:@"HesabeMerchant"
                                             initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  //SSlPinning
  void (^loggerBlock)(NSString *) = ^void(NSString *message)
   {
     NSLog(@"TrustKit log: %@", message);
   };
   [TrustKit setLoggerBlock:loggerBlock];
  
  NSDictionary *trustKitConfig =
    @{
      // Swizzling because we can't access the NSURLSession instance used in React Native's fetch method
      kTSKSwizzleNetworkDelegates: @YES,
      kTSKPinnedDomains: @{
          @"hesabe.com" : @{
              kTSKIncludeSubdomains: @YES, // Pin all subdomains
              kTSKEnforcePinning: @YES, // Block connections if pinning validation failed
              kTSKDisableDefaultReportUri: @YES,
              kTSKPublicKeyHashes : @[
                @"GWo+8S42pJW9ZDyc08vIOhZfvV3uzoIFf+PYx4pqY+Q=",
                @"RQeZkB42znUfsDIIFWIRiYEcKl7nHwNFwWCrnMMJbVc="// Fake backup key but we need to provide 2 pins
              ],
          },
      }};
    [TrustKit initSharedInstanceWithConfiguration:trustKitConfig];
    [TrustKit sharedInstance].pinningValidatorCallback = ^(TSKPinningValidatorResult *result, NSString *notedHostname, TKSDomainPinningPolicy *policy) {
      if (result.finalTrustDecision == TSKTrustEvaluationFailedNoMatchingPin) {
        NSLog(@"TrustKit certificate matching failed");
        exit(0);
        // Add more logging here. i.e. Sentry, BugSnag etc
      }
    };
  
  
  [FIRApp configure];

  UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:[NSBundle mainBundle]];
  UIViewController *vc =[storyboard instantiateInitialViewController];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  //UIViewController *rootViewController = [UIViewController new];
 // rootViewController.view = rootView;
  //self.window.rootViewController = rootViewController;
   self.window.rootViewController = vc;
  [self.window makeKeyAndVisible];
  [RNSplashScreen show];

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void)application:(UIApplication *)application performActionForShortcutItem:(UIApplicationShortcutItem *)shortcutItem completionHandler:(void (^)(BOOL succeeded)) completionHandler {
  [RNQuickActionManager onQuickActionPress:shortcutItem completionHandler:completionHandler];
}


- (void) goToReactView : (NSString * )Token : (NSString *)RefreshToken : (NSString *)TokenExpires :(NSString *)TokenType :(NSString *)UserName :(NSString *)Password :(NSString *)currentlanguage
{
 // bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:options];

   dispatch_async(dispatch_get_main_queue(), ^{
  NSLog(Token);
  NSDictionary *props = @{@"LoginToken" : Token,
                          @"LoginRefreshToken" :RefreshToken,
                          @"LoginTokenExpires" : TokenExpires,
                          @"LoginTokenType" : TokenType,
                          @"UserName" :UserName,
                          @"Password" :Password,
                          @"CurrentLanguage" :currentlanguage
  };

     self->rootView = [[RCTRootView alloc] initWithBridge:self->bridge
                                                    moduleName:@"HesabeMerchant"
                                             initialProperties:props];

     self->rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:0.1];



  UIViewController *rootViewController = [UIViewController new];
     rootViewController.view = self->rootView;

  /*UINavigationController *navigationController =
  [[UINavigationController alloc] initWithRootViewController:rootViewController];

  [navigationController setNavigationBarHidden:true];
  [navigationController setModalPresentationStyle:UIModalPresentationFullScreen];
  navigationController.view.backgroundColor = [UIColor whiteColor];

  UIViewController *topMostViewControllerObj = [self topViewController];
     topMostViewControllerObj.view.backgroundColor = [UIColor whiteColor];
  [topMostViewControllerObj presentViewController:navigationController animated:true completion:nil];*/

     self.window.rootViewController = rootViewController;
     self.window.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:0.1];

      [self.window makeKeyAndVisible];



  });



}


- (UIViewController*)topViewController {
    return [self topViewControllerWithRootViewController:[UIApplication sharedApplication].keyWindow.rootViewController];
}

- (UIViewController*)topViewControllerWithRootViewController:(UIViewController*)rootViewController {
    if ([rootViewController isKindOfClass:[UITabBarController class]]) {
        UITabBarController* tabBarController = (UITabBarController*)rootViewController;
        return [self topViewControllerWithRootViewController:tabBarController.selectedViewController];
    } else if ([rootViewController isKindOfClass:[UINavigationController class]]) {
        UINavigationController* navigationController = (UINavigationController*)rootViewController;
        return [self topViewControllerWithRootViewController:navigationController.visibleViewController];
    } else if (rootViewController.presentedViewController) {
        UIViewController* presentedViewController = rootViewController.presentedViewController;
        return [self topViewControllerWithRootViewController:presentedViewController];
    } else {
        return rootViewController;
    }
}

// this method will be called from the RCTBridge
- (void) goToNativeView {
  NSLog(@"RN binding - Native View - MyViewController.swift - Load From main storyboard");
 // UIViewController *vc = [UIStoryboard storyboardWithName:@"Main" bundle:nil].instantiateInitialViewController;
 // self.window.rootViewController = vc;



  [[NSUserDefaults standardUserDefaults] setBool:true  forKey:@"isFirstLaunchFlag"];
  [[NSUserDefaults standardUserDefaults] synchronize];

  UIStoryboard* storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
  UIViewController * controller = [storyboard instantiateViewControllerWithIdentifier:@"LoginViewController"];

   self.window.rootViewController = controller;


}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url
 options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
 return [RCTLinkingManager application:app openURL:url options:options];
}

- (void)URLSession:(NSURLSession *)session
              task:(NSURLSessionTask *)task
didReceiveChallenge:(NSURLAuthenticationChallenge *)challenge
 completionHandler:(void (^)(NSURLSessionAuthChallengeDisposition disposition, NSURLCredential *credential))completionHandler
{
    TSKPinningValidator *pinningValidator = [[TrustKit sharedInstance] pinningValidator];
    // Pass the authentication challenge to the validator; if the validation fails, the connection will be blocked
    if (![pinningValidator handleChallenge:challenge completionHandler:completionHandler])
    {
        // TrustKit did not handle this challenge: perhaps it was not for server trust
        // or the domain was not pinned. Fall back to the default behavior
        completionHandler(NSURLSessionAuthChallengePerformDefaultHandling, nil);
    }
}


@end
