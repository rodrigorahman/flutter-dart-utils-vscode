# flutter-dart-utils README

Extension that assists in the creation of tests, interfaces, classes and to work with clean architecture, 3-tiers or MVC having the possibility to create features and create tests folder.

* Dart Snippets
* Flutter Snippets
* Modular Snippets
* Modular-old Snippets
* Mobx Snippets
* Cubit Snippets
* flutter_bloc Snippets
* Mockito Snippets
* GetX Snippets
* Shelf Snippets
* Dio Snippets

## Installation
Flutter Utils can be installed from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=RodrigoRahman.flutter-dart-utils) or by [searching within VSCode](https://code.visualstudio.com/docs/editor/extension-gallery#_search-for-an-extension).

## Youtube movie for examples
[Youtube](https://youtu.be/YlL0KJhDFEM) (https://youtu.be/YlL0KJhDFEM)
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
| `Create Stateless Widget`            |
| `Create Stateful Widget`             |
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
| `fu-class-singleton`             | Create a singleton class with file name                |
| `fu-class-equatable`             | Create class with file name and add Equatable          |
| `fu-constructor`                 | Create constructor with file name based                |
| `fu-private-constructor`         | Create private constructor with file name based        |
| `fu-static-attribute`            | Create static atribute in class                        |
| `fu-zero-delay`                  | Create Future.delayed zero                             |
| `fu-seconds-delay`               | Create Future.delayed in seconds                       |
| `fu-milliseconds-delay`          | Create Future.delayed in milliseconds                  |


## Flutter  Snippets Usage
| Shortcut                         | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `fu-stl`                         | Create StatelessWidget with Scaffold and AppBar      |
| `fu-stls`                         | Create StatelessWidget with super.key, Scaffold and AppBar      |
| `fu-stf`                         | Create StatefulWidget with Scaffold and AppBar       |
| `fu-stfs`                         | Create StatefulWidget with with super.key, Scaffold and AppBar       |
| `fu-f-test-init`                 | Create a dart tests                                  |
| `fu-change-notifier`             | Create change notifier class                         |
| `fu-value-notifier`              | Create ValueNotifier                                 |
| `fu-text-editing-controller`     | Create TextEditingController                         |
| `fu-separator`                   | Create SizedBox separator                            |
| `fu-form-key`                    | Create formKey GlobalKey<FormState>                  |
| `fu-part`                        | Add a part based file name ex: home_controller ->  (home_controller.g.dart        |
| `fu-mediaquery`                  | Put MediaQuery.of                                    |
| `fu-sw`                          | Get Screen size width from MediaQuery                |
| `fu-sh`                          | Get Screen size height from MediaQuery               |
| `fu-navigator`                   | Put Navigator.of(context).                           |
| `fu-snackbar`                    | Put ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('$1')))                           |

## Aqueduct Snippets Usage

| Shortcut                         | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `fu-aqu-operation`               | Creates aqueduct operation                           |
| `fu-aqu-serializable`            | Creates aqueduct class serializable                  |


## Modular Old Version Snippets Usage

| Shortcut                         | Description                                          |
| --------------------------------   | ---------------------------------------------------- |
| `fu-modular-old-router-child`          | Creates router with page                             |
| `fu-modular-old-router`                | Creates router module                                |
| `fu-modular-old-initial-router-module` | Creates router module with Modular.initialRoute      |
| `fu-modular-old-initial-router-child`  | Creates router page with Modular.initialRoute        |
| `fu-modular-old-bind`                  | Create Bind for modular                              |
| `fu-modular-old_codegen_inject`        | Modular codegen inject                               |
| `fu-modular-old_module`                | Create Module                                        |

## Modular Snippets Usage
| Shortcut                                      | Description                                                           |
| --------------------------------              | --------------------------------------------------------------------  |
| `fu-modular-initial-config`                   | Create a initial config main.dart                                     |
| `fu-modular-app-widget`                       | Create a initial config main.dart                                     |
| `fu-modular-router-child`                     | Creates router with page                                              |
| `fu-modular-router`                           | Creates router module                                                 |
| `fu-modular-initial-router-child`             | Creates router page with Modular.initialRoute                         |
| `fu-modular-bind-factory`                     | Create Bind Factory for modular                                       |
| `fu-modular-bind-factory-cc`                  | Create Bind Factory for modular with interface and clean code pattern |
| `fu-modular-bind-instance`                    | Create Bind Instance for modular                                      |
| `fu-modular-bind-instance-cc`                 | Create Bind Instance for modular  with interface and clean code pattern |
| `fu-modular-bind-singleton`                   | Create Bind Singleton for modular                                     |
| `fu-modular-bind-lazySingleton`               | Create Bind Lazy Singleton for modular with interface                 |
| `fu-modular-bind-lazySingleton-cc`            | Create Bind Lazy Singleton for modular with interface and clean code pattern |
| `fu-modular-bind-factory-interface`           | Create Bind Factory for modular with interface                        |
| `fu-modular-bind-instance-interface`          | Create Bind Instance for modular with interface                       |
| `fu-modular-bind-singleton-interface`         | Create Bind Singleton for modular with interface                      |
| `fu-modular-bind-lazySingleton-interface`     | Create Bind Lazy Singleton for modular with interface                 |
| `fu-modular_module`                           | Create Module                                                         |


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

## Dio Snippets Usage

| Shortcut                         | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `fu-dio-template-request`        | Template for repositories                            |


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