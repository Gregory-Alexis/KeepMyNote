
# **Keep My Notes**

Keep My Notes est une application de gestion de notes où les utilisateurs peuvent créer, lire, mettre à jour et supprimer leurs propres notes.

---

## **Fonctionnalités**

- **Authentification :**
  - Inscription et connexion sécurisées avec gestion des sessions via JWT.
  - Déconnexion pour sécuriser les accès.

- **Gestion des Utilisateurs (CRUD) :**
  - **Supprimer** : Supprimer son compte utilisateur.

- **Gestion des Notes (CRUD) :**
  - **Créer** : Ajouter une note avec un titre et un contenu.
  - **Lire** : Visualiser toutes les notes des utilsateurs.
  - **Mettre à jour** : Modifier une note existante (uniquement pour le propriétaire).
  - **Supprimer** : Effacer une note (uniquement pour le propriétaire).

- **Interface Moderne et Réactive :**
  - UI conçue avec TailwindCSS.
  - Mises à jour en temps réel grâce à TanStack Query.

- **Sécurité :**
  - Les utilisateurs ne peuvent gérer que leurs propres notes (contrôlé par le backend).
  - Validation des formulaires avec React Hook Form.

---

## **Technologies Utilisées**

### **Frontend**
- **React** : Framework JavaScript pour créer des interfaces utilisateur.
- **TypeScript** : Typage statique pour garantir un code robuste.
- **React Hook Form** : Gestion performante des formulaires avec validation.
- **TanStack Query** : Gestion avancée des requêtes réseau et du cache.
- **TailwindCSS** : Framework CSS utilitaire pour un design rapide.

### **Backend**
- **Node.js** : Runtime JavaScript côté serveur.
- **Express** : Framework minimaliste pour construire des APIs.
- **MongoDB** : Base de données NoSQL pour stocker les utilisateurs et les notes.
- **Mongoose** : ORM pour interagir avec MongoDB.

### **Autres**
- **JWT (JSON Web Tokens)** : Pour gérer l'authentification des utilisateurs.
- **Axios** : Client HTTP pour les requêtes.
- **Zustand** : Store pour la gestion de l'état global.


