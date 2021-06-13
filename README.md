# flutter-dart-utils README

Extension that assists in the creation of tests, interfaces, classes and to work with clean architecture, 3-tiers or MVC having the possibility to create features and create tests folder.

* Dart Snippets
* Flutter Snippets
* Modular Snippets
* Modular3 Snippets
* Mobx Snippets
* Cubit Snippets
* flutter_bloc Snippets
* Mockito Snippets
* GetX Snippets
* Shelf Snippets

## Installation
Flutter Utils can be installed from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=RodrigoRahman.flutter-dart-utils) or by [searching within VSCode](https://code.visualstudio.com/docs/editor/extension-gallery#_search-for-an-extension).

## Features Wrap With
***Important!!!*** 
Select the full widget to find these options

| Features Wrap With                   |
| ------------------------------------ |
| `Wrap with LayoutBuilder`            |
| `Wrap with Builder`                  |
| `Wrap with ValueListenableBuilder`   |
| `Wrap with Consumer`                 |
| `Wrap with MobX Observer`            |
| `Wrap with Obx`                      |
| `Wrap with Getx`                     |


## Menu Features:
| Menu Features                        |
| ------------------------------------ |
| `Clean Arch.: New Feature Backend`   |
| `Clean Arch.: New Feature Flutter`   |
| `3-Tiers Back: New Feature`          |
| `Create Dart Interface`              |
| `Create Dart Class`                  |
| `GetX: New Feature`                  |
| `Flutter Modular: New Feature`       |


## Dart Snippets Usage

| Shortcut                         | Description                                          |
| -------------------------------- | ------------------------------------------------------ |
| `fu-freezed`                     | Creates a Freezed class                                |
| `fu-freezed-json-serializable`   | Creates a Freezed with JsonSerializable                |
| `fu-interface`                   | Creates a Interfaces                                   |
| `fu-class-interface`             | Creates a Classes with interface                       |
| `fu-callable-class`              | Create a Callable Classes                              |
| `fu-d-test-init`                 | Create a dart tests                                    |
| `fu-class`                       | Create class with file name                            |
| `fu-class-equatable`             | Create class with file name and add Equatable          |
| `fu-constructor`                 | Create constructor with file name based                |


## Flutter  Snippets Usage
| Shortcut                         | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `fu-stl`                         | Create StatelessWidget with Scaffold and AppBar      |
| `fu-stf`                         | Create StatefulWidget with Scaffold and AppBar       |
| `fu-f-test-init`                 | Create a dart tests                                  |
| `fu-change-notifier`             | Create change notifier class                         |
| `fu-value-notifier`              | Create ValueNotifier                                 |
| `fu-text-editing-controller`     | Create TextEditingController                         |

## Aqueduct Snippets Usage

| Shortcut                         | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `fu-aqu-operation`               | Creates aqueduct operation                           |
| `fu-aqu-serializable`            | Creates aqueduct class serializable                  |


## Modular Snippets Usage

| Shortcut                         | Description                                          |
| --------------------------------   | ---------------------------------------------------- |
| `fu-modular-router-child`          | Creates router with page                             |
| `fu-modular-router`                | Creates router module                                |
| `fu-modular-initial-router-module` | Creates router module with Modular.initialRoute      |
| `fu-modular-initial-router-child`  | Creates router page with Modular.initialRoute        |
| `fu-modular-bind`                  | Create Bind for modular                              |
| `fu-modular_codegen_inject`        | Modular codegen inject                               |
| `fu-modular_module`                | Create Module                                        |

## Modular3 Snippets Usage
| Shortcut                                      | Description                                                           |
| --------------------------------              | --------------------------------------------------------------------  |
| `fu-modular3-router-child`                    | Creates router with page                                              |
| `fu-modular3-router`                          | Creates router module                                                 |
| `fu-modular3-initial-router-child`            | Creates router page with Modular.initialRoute                         |
| `fu-modular3-bind-factory`                    | Create Bind Factory for modular                                       |
| `fu-modular3-bind-instance`                   | Create Bind Instance for modular                                      |
| `fu-modular3-bind-singleton`                  | Create Bind Singleton for modular                                     |
| `fu-modular3-bind-lazySingleton`              | Create Bind Lazy Singleton for modular with interface                 |
| `fu-modular3-bind-factory-interface`          | Create Bind Factory for modular with interface                        |
| `fu-modular3-bind-instance-interface`         | Create Bind Instance for modular with interface                       |
| `fu-modular3-bind-singleton-interface`        | Create Bind Singleton for modular with interface                      |
| `fu-modular3-bind-lazySingleton-interface`    | Create Bind Lazy Singleton for modular with interface                 |
| `fu-modular3_module`                          | Create Module                                                         |


## Flutter Bloc Snippets Usage

| Shortcut                         | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `fu-bloctransform`               | Override transformEvents method                      |


## Cubit Snippets Usage

| Shortcut                         | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `fu-cubitot`                     | Override onTransition method                         |
| `fu-cubitaction`                 | Create cubit function action                         |


## Mockito Snippets Usage

| Shortcut                         | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `fu-test-when-async`             | Add when mockito async                               |
| `fu-test-when`                   | Add when mockito sync                                |
| `fu-test-when-throw`             | Add when mockito sync                                |
| `fu-test-mock`                   | Create a mock class                                  |

## Flutter Provider Snippets Usage

| Shortcut                         | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `fu-provider-watch`              | context.watch                                        |
| `fu-provider-read`               | context.watch                                        |
| `fu-provider-select`             | context.select                                       |


## Flutter GetX Snippets Usage

| Shortcut                         | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `fu-getxbinding`                 | Create Binding                                       |
| `fu-getxcontroller`              | Create Controller                                    |
| `fu-getxrx`                      | Create Rx variable                                   |
| `fu-getxobs`                     | Create .obs variable                                 |
| `fu-getxoninit`                  | Create onInit method                                 |
| `fu-getxonclose`                 | Create onClose method                                |
| `fu-getxpage`                    | Create Page with GetView                             |


## Shelf/Shelf-Router Snippets Usage

| Shortcut                         | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `fu-shelf-controller`            | Create Controller with shelf-router                  |
| `fu-shelf-operation`             | Create Rest Operation                                |


### Generate folders for MVC architecture
![demo](https://raw.githubusercontent.com/rodrigorahman/flutter-dart-utils-vscode/master/assets/generate_folder_MVC.gif)

### Generate dart interface
![demo](https://raw.githubusercontent.com/rodrigorahman/flutter-dart-utils-vscode/master/assets/generate_interface_flutter.gif)

### Generate dart class
![demo](https://raw.githubusercontent.com/rodrigorahman/flutter-dart-utils-vscode/master/assets/generate_class_flutter.gif)

### Implements dart interface
![demo](https://raw.githubusercontent.com/rodrigorahman/flutter-dart-utils-vscode/master/assets/implements_class_flutter.gif)

### Generate folders clean architecture for backend
![demo](https://raw.githubusercontent.com/rodrigorahman/flutter-dart-utils-vscode/master/assets/clean-example.gif)

### Generate folders clean architecture for flutter
![demo](https://raw.githubusercontent.com/rodrigorahman/flutter-dart-utils-vscode/master/assets/clean_generate_flutter.gif)

### Generate folders 3-tiers architecture
![demo](https://raw.githubusercontent.com/rodrigorahman/flutter-dart-utils-vscode/master/assets/generate_folder_3-tiers.gif)

### Generate folder for test
![demo](https://raw.githubusercontent.com/rodrigorahman/flutter-dart-utils-vscode/master/assets/generate_folder_test_flutter.gif)

### Wrap with Consumer
![demo](https://raw.githubusercontent.com/rodrigorahman/flutter-dart-utils-vscode/master/assets/wrap-with-consumer.gif)

### Wrap with ValueListenableBuilder
![demo](https://raw.githubusercontent.com/rodrigorahman/flutter-dart-utils-vscode/master/assets/wrap-with-value-listener.gif)

### Wrap with Builder
![demo](https://raw.githubusercontent.com/rodrigorahman/flutter-dart-utils-vscode/master/assets/wrap-with-value-listener.gif)

### Wrap with LayoutBuilder
![demo](https://raw.githubusercontent.com/rodrigorahman/flutter-dart-utils-vscode/master/assets/wrap-with-value-listener.gif)


## Requirements


## Extension Settings


## Known Issues


## Release Notes
* 0.0.34 - Add snippets for mockito
* 0.0.35 - Restructuring clean architecture folder generation
* 0.0.36 - New mockito snippet
* 0.0.39 - 3-Tiers Folders
* 0.0.40 - Bug fix StatefulWidget generate
* 0.0.41 - Bug fix Implements Interface
* 0.0.42 - Bug fix folder for clean architecture
* 0.0.44 - Add news modular snipets
* 0.0.45 - MVC new features
* 0.0.46
    - Add Wrap with Consumer(Provider) and ValueListenableBuilder
    - New Snippets ChangeNotifier
    - New Snippets ValueNotifier
    - Change Snippets Modular
* 0.0.56 - Add Provider Snippets
* 0.0.57 - Add Flutter Snippet TextEditingController
* 0.0.59 - Add GetX Snippets
* 0.0.63 - Add Wrap with Observer(MobX)
* 0.0.64 - Add Shelf Snippets
* 0.0.65 - Bugfix Shelf controller Snippets
* 0.0.66 - Add new snippets from GetX
* 0.0.67 - Add new snippets from GetX GetView
* 0.0.68 - Add new snippets from Modular3
* 0.0.71 - GetX create new feature
* 0.0.73 - Mysql Connection template
* 0.0.74 - New snippets of test
* 0.0.75 - Bugfix - snippets group test
* 0.0.76 - Code Review, refatoring and add new features
* 0.0.77 - Bugfix on windows system
* 0.0.78 - Bugfix on windows system for implementation interface
* 0.0.79 - Add wrap with Obx e GetX
* 0.0.81 - Constructor snippet, and bugfix any snippets
* 0.0.82 - Change snippets Flutter modular 3
* 0.0.83 - Mobx Snippets
* 0.0.84 - Add new snippet (private constructor)