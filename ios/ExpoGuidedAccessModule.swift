import ExpoModulesCore

let guidedAccessEnabledChanged: String = "Expo.guidedAccessEnabledChanged"

public class ExpoGuidedAccessModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoGuidedAccess")
        
        Events(guidedAccessEnabledChanged)
        
        AsyncFunction("isGuidedAccessEnabled") { () -> Bool in
            return DispatchQueue.main.sync {
                return UIAccessibility.isGuidedAccessEnabled
            }
        }
        
        OnStartObserving {
            NotificationCenter.default.addObserver(
                self,
                selector: #selector(self.guidedAccessEnabledChangedListener),
                name: UIAccessibility.guidedAccessStatusDidChangeNotification,
                object: nil
            )
        }
        
        OnStopObserving {
            NotificationCenter.default.removeObserver(
                self,
                name: UIAccessibility.guidedAccessStatusDidChangeNotification,
                object: nil
            )
        }
    }
    
    @objc
    private func guidedAccessEnabledChangedListener() {
        sendEvent(guidedAccessEnabledChanged, [
            "guidedAccessEnabled": UIAccessibility.isGuidedAccessEnabled
        ])
    }
}

