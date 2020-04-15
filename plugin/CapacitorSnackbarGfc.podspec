
  Pod::Spec.new do |s|
    s.name = 'CapacitorSnackbarGfc'
    s.version = '0.0.1'
    s.summary = 'implement snackbar android'
    s.license = 'MIT'
    s.homepage = 'https://github.com/SASGeniusFlashConception/capacitor-snackbar-gfc.git'
    s.author = 'SAS GeniusFlash Conception'
    s.source = { :git => 'https://github.com/SASGeniusFlashConception/capacitor-snackbar-gfc.git', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '11.0'
    s.dependency 'Capacitor'
  end