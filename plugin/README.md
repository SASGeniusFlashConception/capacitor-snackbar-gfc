# SnackBarGFC - Android

[![Version Npm](https://img.shields.io/npm/v/capacitor-snackbar-gfc)](https://www.npmjs.com/package/capacitor-snackbar-gfc)

> Le plugin **capacitor-snackbar-gfc** est une implementation native du composant SnackBars d'Android.
> Vous pouvez maintenant utiliser ce package comme plugin [Ionic Capacitor](https://capacitor.ionicframework.com) dans votre application.
>
![Alt text](imgDoc/Screenshot_1_portrait.png?raw=true "Screenshot_1")

## Soutenez nos développements

> Votre don nous permettra de developper plus de plugin open source mais également a maintenir ceux déjà publiés pour garantir une compatibilité avec les future version d'android, d'ios et de capacitor.
> Merci de votre soutien ! 

❤[Je fais un don](https://paypal.me/GFCPAYPAL)❤

## Sommaire

1. [Plateformes prise en charge](#1-plateformes-prise-en-charge) 
2. [Installation](#2-installation)  
    2.1 [Récuperation du package sur npm](#21-r%C3%A9cuperation-du-package-sur-npm)  
    2.2 [Ajout du plugin dans votre MainActivity.java](#22-ajout-du-plugin-dans-votre-mainactivityjava)   
3. [Screenshot](#3-screenshot) 
4. [Méthodes du plugin](#4-m%C3%A9thodes-du-plugin) 
5. [Interfaces du plugin](#5-interfaces-du-plugin)  
    5.1 [SnackbarOpts](#51-snackbaropts)   
    5.2 [MessageStyleOpts](#52-messagestyleopts)  
    5.3 [ButtonActionStyleOpts](#53-buttonactionstyleopts)        
6. [Enums du plugin](#6-enums-du-plugin)   
    6.1 [DURATION_ENUM](#61-duration_enum)   
    6.2 [POSITION_ENUM](#62-position_enum)  
    6.3 [TYPE_LINE_ENUM](#63-type_line_enum)  
7. [Utilisation du plugin](#7-utilisation-du-plugin)  
    7.1 [Intégration du plugin](#71-int%C3%A9gration-du-plugin)  
    7.2 [Méthode show(options:SnackbarOpts)](#72-m%C3%A9thode-showoptions-snackbaropts)  
    7.3 [Méthode dismissShowingSnackbar()](#73-m%C3%A9thode-dismissshowingsnackbar)  
    7.4 [Méthode addListener('snackbarEvent')](#73-m%C3%A9thode-addlistenersnackbarevent)  
8. [Demo](#8-demo-du-plugin) 
9. [Nos autres plugins](#9-nos-autres-plugins) 


## 1. Plateformes prise en charge

- [x] Android

## 2. Installation

### 2.1 Récuperation du package sur npm

``` npm install capacitor-snackbar-gfc --save ```

### 2.2 Ajout du plugin dans votre MainActivity.java

> Le fichier MainActivity est disponible dans ``app/java/packageid/`` depusi android studio

```java
    // Autres imports...
    import com.gfc.snackbargfc.SnackBarGFC;
    
    public class MainActivity extends BridgeActivity {
      @Override
      public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
    
          add(SnackBarGFC.class);  // Ajout du plugin SnackBarGFC 
    
        }});
      }
    }
```

## 3. Screenshot

| Message seulement                                                    | Message seulement + centré                                           | Message seul + Multiline                                             |
|----------------------------------------------------------------------|----------------------------------------------------------------------|----------------------------------------------------------------------|
|![Alt text](imgDoc/Screenshot_2_portrait.png?raw=true "Screenshot_2") |![Alt text](imgDoc/Screenshot_3_portrait.png?raw=true "Screenshot_3") |![Alt text](imgDoc/Screenshot_4_portrait.png?raw=true "Screenshot_4") |

| Basic + changement couleur bouton + multiline                        | Changement de couleur + Message centré + multiline                   | Changement de couleur                                                |
|----------------------------------------------------------------------|----------------------------------------------------------------------|----------------------------------------------------------------------|
|![Alt text](imgDoc/Screenshot_5_portrait.png?raw=true "Screenshot_5") |![Alt text](imgDoc/Screenshot_6_portrait.png?raw=true "Screenshot_6") |![Alt text](imgDoc/Screenshot_7_portrait.png?raw=true "Screenshot_7") |

## 4. Méthodes du plugin

| Methodes                                                                                | Android   |
|:----------------------------------------------------------------------------------------|:----------|
| show(option: SnackbarOpts): Promise<{}>                                                 | Disponible|
| dismissShowingSnackbar()                                                                | Disponible|
| addListener(eventName: 'snackbarEvent', listenerFunc: () => void): PluginListenerHandle | Disponible|

## 5. Interfaces du plugin

### 5.1 SnackbarOpts

| Propriété         | Etat        | Type                                               | Defaut   | Commentaire                                                                                                            |
|:------------------|:------------|:---------------------------------------------------|:---------|:-----------------------------------------------------------------------------------------------------------------------|
| message           | Obligatoire | string                                             | null     | Si _message_ est **null** alors il y a une erreur                                                                      |
| duration          | Obligatoire | [DURATION_ENUM](#61-duration_enum)                 | 'short'  | Si _buttonAction_ est à **true** et _duration_ à **indefinite** alors c'est la valeur **long** qui est prise en compte |
| messageStyle      | Obligatoire | [MessageStyleOpts](#52-buttonactionstyleopts)      | Object   | il faut renseigner la propriété _messagePosition_ et _messageTypeLine_                                                 |
| buttonAction      | Obligatoire | boolean                                            | 'false'  | La SnackBar contiendra un bouton si _buttonAction_ est à **true**                                                      |
| buttonActionStyle | Optionel    | [ButtonActionStyleOpts](#53-messagestyleopts)      | Object   | Si _buttonAction_ est à **true** il faudra renseigner la propriété _buttonActionText_                                  |
| backgroundColor   | Optionel    | string                                             | '#4A4747'| Les couleurs devront commencer par # et contenir 7 caractères (ex: #4A4747)                                            |

### 5.2 MessageStyleOpts

| Propriété       | Etat        | Type                                 | Defaut    | Commentaire                                                                 |
|:----------------|:------------|:-------------------------------------|:----------|:----------------------------------------------------------------------------|
| messagePosition | Obligatoire | [POSITION_ENUM](#62-position_enum)   | null      |                                                                             |
| messageTypeLine | Obligatoire | [TYPE_LINE_ENUM](#63-type_line_enum) | 'default' |                                                                             |
| messageMaxLine  | Optionel    | number                               | 5         | A renseigner uniquement si _messageTypeLine_ est égale à **multiline**      |
| messageColor    | Optionel    | string                               | '#FFFFFF' | Les couleurs devront commencer par # et contenir 7 caractères (ex: #FFFFFF) |

### 5.3 ButtonActionStyleOpts

| Propriété         | Etat        | Type   | Defaut    | Commentaire                                                                 |
|:------------------|:------------|:-------|:----------|:----------------------------------------------------------------------------|
| buttonActionText  | Obligatoire | string | null      |                                                                             |
| buttonActionColor | Optionel    | string | '#E35A5A' | Les couleurs devront commencer par # et contenir 7 caractères (ex: #FFFFFF) |

## 6. Enums du plugin

### 6.1 DURATION_ENUM

| Propriété | Valeur       |
|:----------|:-------------|
| SHORT     | 'short'      |
| LONG      | 'long'       |
| INDEFINITE| 'indefinite' |                                                           
 
### 6.2 POSITION_ENUM

 | Propriété| Valeur    |
 |:---------|:----------|
 | DEFAULT  | 'default' |
 | CENTER   | 'center'  |
 
### 6.3 TYPE_LINE_ENUM

 | Propriété| Valeur      |
 |:---------|:------------|
 | DEFAULT  | 'default'   |
 | MULTILINE| 'multiline' |

## 7. Utilisation du plugin

### 7.1 Intégration du plugin

```typescript
// Autres imports...
import{Plugins} from '@capacitor/core'
const {SnackBarGFC} = Plugins;
```

### 7.2 Méthode show(options: SnackbarOpts)

```typescript
const opts: SnackbarOpts = {
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                duration: DURATION_ENUM.INDEFINITE,
                messageStyle: {
                    messagePosition: POSITION_ENUM.DEFAULT,
                    messageTypeLine: TYPE_LINE_ENUM.DEFAULT,
                    messageColor: '#F0F0F0'
                },
                buttonAction: true,
                buttonActionStyle: {
                    buttonActionText: 'Close',
                    buttonActionColor: '#BA85FA'
                },
                backgroundColor: '#292929'
           }

SnackBarGFC.show(opts);
```

### 7.3 Méthode dismissShowingSnackbar()

```typescript
    ionViewWillLeave() {
        SnackBarGFC.dismissShowingSnackbar();
    }
```

### 7.4 Méthode addListener('snackbarEvent')

> Cette évenement est déclenché lorsque l'utilisateur clique sur le bouton du composant
```typescript
    ngOnInit() {
        SnackBarGFC.addListener('snackbarEvent', () => {
            // votre code...
        });
    }
```

## 8. Demo du plugin

> Téléchargez notre [demo](https://github.com/SASGeniusFlashConception/capacitor-snackbar-gfc/tree/master/demo/SnackBarGFCDemo).

## 9. Nos autres plugins

| Nom              | Package                          | Version | Plateformes |
|:-----------------|:---------------------------------|:--------|:------------|
| AppRateGFC | [capacitor-apprate-gfc](https://github.com/SASGeniusFlashConception/capacitor-apprate-gfc) | [![Version Npm](https://img.shields.io/npm/v/capacitor-apprate-gfc)](https://www.npmjs.com/package/capacitor-apprate-gfc) | Android |
| DateTimePickerGFC | [capacitor-datetimepicker-gfc](https://github.com/SASGeniusFlashConception/capacitor-datetimepicker-gfc) | [![Version Npm](https://img.shields.io/npm/v/capacitor-datetimepicker-gfc)](https://www.npmjs.com/package/capacitor-datetimepicker-gfc) | Android |
| CalendarEventGFC | [capacitor-calendarevent-gfc](https://github.com/SASGeniusFlashConception/capacitor-calendarevent-gfc) | [![Version Npm](https://img.shields.io/npm/v/capacitor-calendarevent-gfc)](https://www.npmjs.com/package/capacitor-calendarevent-gfc) | Android |
