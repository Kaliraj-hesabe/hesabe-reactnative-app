//
//  ChangeViewBridge.h
//  Sample
//
//  Created by pramod yadav on 07/08/20.
//


#import <React/RCTBridgeModule.h>

@interface ChangeViewBridge : NSObject <RCTBridgeModule>
- (void) changeToNativeView;
- (void) updateLanguage : (NSString *) value;
@end


