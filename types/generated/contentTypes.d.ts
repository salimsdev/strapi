import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    offre: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'api::offre.offre'
    >;
    nom: Attribute.String & Attribute.Required;
    prenom: Attribute.String & Attribute.Required;
    paiement: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    mon_of: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::mon-of.mon-of'
    >;
    documents: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::document.document'
    >;
    lieux: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::lieu.lieu'
    >;
    actions: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::action.action'
    >;
    articles: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::article.article'
    >;
    certifications: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::certification.certification'
    >;
    competences: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::competence.competence'
    >;
    dates_modules: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::dates-module.dates-module'
    >;
    emails: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::email.email'
    >;
    entreprises: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::entreprise.entreprise'
    >;
    evaluations: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::evaluation.evaluation'
    >;
    evaluation_stagiaires: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::evaluation-stagiaire.evaluation-stagiaire'
    >;
    financements: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::financement.financement'
    >;
    formations: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::formation.formation'
    >;
    gestion_commerciales: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::gestion-commerciale.gestion-commerciale'
    >;
    modules: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::module.module'
    >;
    questions: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::question.question'
    >;
    question_stagiaires: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::question-stagiaire.question-stagiaire'
    >;
    rhs: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::rh.rh'
    >;
    sessions: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::session.session'
    >;
    stagiaires: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::stagiaire.stagiaire'
    >;
    veilles: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::veille.veille'
    >;
    veille_metiers: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::veille-metier.veille-metier'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActionAction extends Schema.CollectionType {
  collectionName: 'actions';
  info: {
    singularName: 'action';
    pluralName: 'actions';
    displayName: 'Action';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    intitule: Attribute.String;
    objectif_general: Attribute.Text;
    formation: Attribute.Relation<
      'api::action.action',
      'manyToOne',
      'api::formation.formation'
    >;
    modules: Attribute.Relation<
      'api::action.action',
      'manyToMany',
      'api::module.module'
    >;
    sessions: Attribute.Relation<
      'api::action.action',
      'oneToMany',
      'api::session.session'
    >;
    prerequis: Attribute.Text & Attribute.DefaultTo<'Aucun pr\u00E9requis'>;
    public: Attribute.Text;
    modalites_delais_acces: Attribute.RichText;
    nature_action: Attribute.Enumeration<
      [
        'Action de formation',
        'Bilan de comp\u00E9tences',
        "Action de validation des acquis de l'exp\u00E9rience",
        'Action de formation par apprentissage'
      ]
    >;
    modalites_evaluation_suivi: Attribute.RichText;
    diplome_bpf: Attribute.Text;
    points_forts: Attribute.Text;
    validation_blocs: Attribute.RichText;
    equivalences: Attribute.RichText;
    suites_debouches: Attribute.RichText;
    tarif: Attribute.Decimal;
    tva: Attribute.Decimal;
    modalites_reglement: Attribute.Text;
    duree: Attribute.Text;
    certification: Attribute.Relation<
      'api::action.action',
      'manyToOne',
      'api::certification.certification'
    >;
    evaluations: Attribute.Relation<
      'api::action.action',
      'manyToMany',
      'api::evaluation.evaluation'
    >;
    evaluation_stagiaires: Attribute.Relation<
      'api::action.action',
      'oneToMany',
      'api::evaluation-stagiaire.evaluation-stagiaire'
    >;
    emails: Attribute.Relation<
      'api::action.action',
      'oneToMany',
      'api::email.email'
    >;
    documents: Attribute.Relation<
      'api::action.action',
      'oneToMany',
      'api::document.document'
    >;
    user: Attribute.Relation<
      'api::action.action',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::action.action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::action.action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    pubDate: Attribute.DateTime;
    link: Attribute.Text;
    source: Attribute.String;
    veilles: Attribute.Relation<
      'api::article.article',
      'oneToMany',
      'api::veille.veille'
    >;
    categorie: Attribute.Enumeration<
      [
        'Veille l\u00E9gale et r\u00E9glementaire',
        'Veille technologique',
        'Veille p\u00E9dagogique',
        "Veille cr\u00E9ation d'entreprise",
        'Veille VAE',
        'Veille Handicap',
        'Veille interactive',
        'Veille m\u00E9tier',
        'Archiv\u00E9s'
      ]
    >;
    user: Attribute.Relation<
      'api::article.article',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCertificationCertification extends Schema.CollectionType {
  collectionName: 'certifications';
  info: {
    singularName: 'certification';
    pluralName: 'certifications';
    displayName: 'Certification';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    intitule: Attribute.String;
    type: Attribute.Enumeration<['RNCP', 'RS', 'Autres']>;
    certificateur: Attribute.String;
    url_referentiel: Attribute.String;
    formation: Attribute.Relation<
      'api::certification.certification',
      'manyToOne',
      'api::formation.formation'
    >;
    actions: Attribute.Relation<
      'api::certification.certification',
      'oneToMany',
      'api::action.action'
    >;
    user: Attribute.Relation<
      'api::certification.certification',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    codeRNCPRS: Attribute.String;
    enregistrement: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::certification.certification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::certification.certification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCompetenceCompetence extends Schema.CollectionType {
  collectionName: 'competences';
  info: {
    singularName: 'competence';
    pluralName: 'competences';
    displayName: 'Competence';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    intitule: Attribute.String;
    contenu: Attribute.RichText;
    methodes_pedagogiques: Attribute.RichText;
    moyens_pedagogiques: Attribute.RichText;
    module: Attribute.Relation<
      'api::competence.competence',
      'manyToOne',
      'api::module.module'
    >;
    duree: Attribute.Integer;
    user: Attribute.Relation<
      'api::competence.competence',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::competence.competence',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::competence.competence',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDatesModuleDatesModule extends Schema.CollectionType {
  collectionName: 'dates_modules';
  info: {
    singularName: 'dates-module';
    pluralName: 'dates-modules';
    displayName: 'DatesModule';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    moduleDate: Attribute.DateTime;
    matinStart: Attribute.Time;
    matinEnd: Attribute.Time;
    apresmidiStart: Attribute.Time;
    apresmidiEnd: Attribute.Time;
    formateur_matin: Attribute.Relation<
      'api::dates-module.dates-module',
      'manyToOne',
      'api::rh.rh'
    >;
    formateur_apresmidi: Attribute.Relation<
      'api::dates-module.dates-module',
      'manyToOne',
      'api::rh.rh'
    >;
    stagiaires_matin: Attribute.Relation<
      'api::dates-module.dates-module',
      'manyToMany',
      'api::stagiaire.stagiaire'
    >;
    stagiaires_apresmidi: Attribute.Relation<
      'api::dates-module.dates-module',
      'manyToMany',
      'api::stagiaire.stagiaire'
    >;
    documents: Attribute.Relation<
      'api::dates-module.dates-module',
      'oneToMany',
      'api::document.document'
    >;
    lieu: Attribute.Relation<
      'api::dates-module.dates-module',
      'oneToOne',
      'api::lieu.lieu'
    >;
    user: Attribute.Relation<
      'api::dates-module.dates-module',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dates-module.dates-module',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dates-module.dates-module',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDocumentDocument extends Schema.CollectionType {
  collectionName: 'documents';
  info: {
    singularName: 'document';
    pluralName: 'documents';
    displayName: 'Document';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    doc: Attribute.Media;
    stagiaire: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::stagiaire.stagiaire'
    >;
    action: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::action.action'
    >;
    session: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::session.session'
    >;
    rh: Attribute.Relation<'api::document.document', 'manyToOne', 'api::rh.rh'>;
    email: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::email.email'
    >;
    entreprise: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::entreprise.entreprise'
    >;
    dates_module: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::dates-module.dates-module'
    >;
    type: Attribute.Enumeration<
      [
        'Logo',
        'Tampon',
        'Signature',
        'Programme de formation',
        'R\u00E8glement int\u00E9rieur',
        'Contrat de formation professionnelle',
        'Convention de formation professionnelle',
        'Conditions g\u00E9n\u00E9rales de vente',
        'Feuilles de pr\u00E9sence sign\u00E9es',
        'Relev\u00E9s de connexion',
        'Autres documents de pr\u00E9sence',
        'Facture',
        'Devis',
        'Contrat de sous-traitance',
        'Engagement sous-traitant',
        'CV',
        'Dipl\u00F4me',
        'Fiche de poste',
        'Autres documents collaborateurs',
        'Extrait Kbis',
        "R\u00E9c\u00E9piss\u00E9 de d\u00E9claration d'activit\u00E9",
        'Bilan p\u00E9dagogique et financier',
        'Certificat Qualiopi',
        'Dipl\u00F4me du dirigeant',
        'Autres documents OF'
      ]
    >;
    financement: Attribute.Relation<
      'api::document.document',
      'oneToOne',
      'api::financement.financement'
    >;
    number: Attribute.String;
    gestion_commerciale: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::gestion-commerciale.gestion-commerciale'
    >;
    mon_of: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::mon-of.mon-of'
    >;
    user: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::document.document',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::document.document',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDocumentsTemplateDocumentsTemplate
  extends Schema.CollectionType {
  collectionName: 'documents_templates';
  info: {
    singularName: 'documents-template';
    pluralName: 'documents-templates';
    displayName: 'Documents_template';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    document: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::documents-template.documents-template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::documents-template.documents-template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEmailEmail extends Schema.CollectionType {
  collectionName: 'emails';
  info: {
    singularName: 'email';
    pluralName: 'emails';
    displayName: 'Email';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    from: Attribute.Email;
    to: Attribute.Email;
    objet: Attribute.String;
    stagiaire: Attribute.Relation<
      'api::email.email',
      'manyToOne',
      'api::stagiaire.stagiaire'
    >;
    session: Attribute.Relation<
      'api::email.email',
      'manyToOne',
      'api::session.session'
    >;
    text: Attribute.RichText;
    type: Attribute.Enumeration<
      [
        'Autres emails',
        'Email de bienvenue',
        'Email acc\u00E8s apprenant',
        'Email de confirmation',
        'Email de convocation',
        'Email de rappel',
        'Echanges pendant la session',
        "Email de confirmation d'abandon de la formation",
        "Email de confirmation d'abandon d'un salari\u00E9",
        "Email d'absence",
        'Email de pr\u00E9sence',
        'Email de satisfaction \u00E0 chaud',
        'Email de satisfaction \u00E0 froid',
        'Email pour certificat de r\u00E9alisation',
        'Email de satisfaction formateur',
        'Email de satisfaction entreprise',
        'Email de facturation',
        "Email d'envoi de devis",
        'Email de rappel de facturation',
        'Email pour formateur sous-traitant',
        'Email pour formateur'
      ]
    >;
    rh: Attribute.Relation<'api::email.email', 'manyToOne', 'api::rh.rh'>;
    action: Attribute.Relation<
      'api::email.email',
      'manyToOne',
      'api::action.action'
    >;
    documents: Attribute.Relation<
      'api::email.email',
      'oneToMany',
      'api::document.document'
    >;
    entreprise: Attribute.Relation<
      'api::email.email',
      'manyToOne',
      'api::entreprise.entreprise'
    >;
    sent: Attribute.Boolean & Attribute.DefaultTo<true>;
    dateToSend: Attribute.DateTime;
    user: Attribute.Relation<
      'api::email.email',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::email.email',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::email.email',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEntrepriseEntreprise extends Schema.CollectionType {
  collectionName: 'entreprises';
  info: {
    singularName: 'entreprise';
    pluralName: 'entreprises';
    displayName: 'Entreprise';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    denomination: Attribute.String;
    adresse: Attribute.String;
    codepostal: Attribute.String;
    ville: Attribute.String;
    pays: Attribute.String & Attribute.DefaultTo<'FRANCE'>;
    website: Attribute.String;
    telephone: Attribute.String;
    email: Attribute.Email;
    contactnom: Attribute.String;
    contactprenom: Attribute.String;
    contacttel: Attribute.String;
    contactemail: Attribute.Email;
    contactfonction: Attribute.String;
    codeape: Attribute.String;
    numerotva: Attribute.String;
    relations: Attribute.Relation<
      'api::entreprise.entreprise',
      'manyToMany',
      'api::relation-entreprise.relation-entreprise'
    >;
    siret: Attribute.String;
    siren: Attribute.String;
    nda: Attribute.String;
    rhs: Attribute.Relation<
      'api::entreprise.entreprise',
      'oneToMany',
      'api::rh.rh'
    >;
    gestion_commerciales: Attribute.Relation<
      'api::entreprise.entreprise',
      'oneToMany',
      'api::gestion-commerciale.gestion-commerciale'
    >;
    opportuniteApportee: Attribute.Relation<
      'api::entreprise.entreprise',
      'oneToMany',
      'api::gestion-commerciale.gestion-commerciale'
    >;
    documents: Attribute.Relation<
      'api::entreprise.entreprise',
      'oneToMany',
      'api::document.document'
    >;
    emails: Attribute.Relation<
      'api::entreprise.entreprise',
      'oneToMany',
      'api::email.email'
    >;
    user: Attribute.Relation<
      'api::entreprise.entreprise',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    regionnda: Attribute.Enumeration<
      [
        'Auvergne-Rh\u00F4ne-Alpes',
        'Bourgogne-Franche-Comt\u00E9',
        'Bretagne',
        'Centre-Val de Loire',
        'Corse',
        'Grand-Est',
        'Guadeloupe',
        'Guyane',
        'Hauts-de-France',
        '\u00CEle de France',
        'La R\u00E9union',
        'Martinique',
        'Mayotte',
        'Normandie',
        'Nouvelle-Aquitaine',
        'Occitanie',
        'Pays de la Loire',
        "Provence-Alpes-C\u00F4te d'Azur"
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::entreprise.entreprise',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::entreprise.entreprise',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEvaluationEvaluation extends Schema.CollectionType {
  collectionName: 'evaluations';
  info: {
    singularName: 'evaluation';
    pluralName: 'evaluations';
    displayName: 'Evaluation';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.Text;
    type: Attribute.Enumeration<
      [
        'Test de positionnement',
        "Questionnaire d'\u00E9valuation des besoins",
        "Questionnaire d'\u00E9valuation des besoins handicap",
        'Evaluation de d\u00E9but de formation',
        'Evaluation en cours de formation',
        'Evaluation de fin de formation',
        'Questionnaire de satisfaction \u00E0 chaud',
        'Questionnaire de satisfaction \u00E0 froid',
        'Questionnaire de satisfaction formateur',
        'Questionnaire de satisfaction employeur',
        'Questionnaire de satisfaction financeur'
      ]
    >;
    formation: Attribute.Relation<
      'api::evaluation.evaluation',
      'manyToOne',
      'api::formation.formation'
    >;
    questions: Attribute.Relation<
      'api::evaluation.evaluation',
      'oneToMany',
      'api::question.question'
    >;
    actions: Attribute.Relation<
      'api::evaluation.evaluation',
      'manyToMany',
      'api::action.action'
    >;
    sessions: Attribute.Relation<
      'api::evaluation.evaluation',
      'oneToMany',
      'api::session.session'
    >;
    user: Attribute.Relation<
      'api::evaluation.evaluation',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::evaluation.evaluation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::evaluation.evaluation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEvaluationStagiaireEvaluationStagiaire
  extends Schema.CollectionType {
  collectionName: 'evaluation_stagiaires';
  info: {
    singularName: 'evaluation-stagiaire';
    pluralName: 'evaluation-stagiaires';
    displayName: 'Evaluation-stagiaire';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String;
    type: Attribute.Enumeration<
      [
        'Test de positionnement',
        "Questionnaire d'\u00E9valuation des besoins",
        "Questionnaire d'\u00E9valuation des besoins handicap",
        'Evaluation de d\u00E9but de formation',
        'Evaluation en cours de formation',
        'Evaluation de fin de formation',
        'Questionnaire de satisfaction \u00E0 chaud',
        'Questionnaire de satisfaction \u00E0 froid',
        'Questionnaire de satisfaction formateur',
        'Questionnaire de satisfaction employeur',
        'Questionnaire de satisfaction financeur'
      ]
    >;
    stagiaire: Attribute.Relation<
      'api::evaluation-stagiaire.evaluation-stagiaire',
      'manyToOne',
      'api::stagiaire.stagiaire'
    >;
    session: Attribute.Relation<
      'api::evaluation-stagiaire.evaluation-stagiaire',
      'manyToOne',
      'api::session.session'
    >;
    action: Attribute.Relation<
      'api::evaluation-stagiaire.evaluation-stagiaire',
      'manyToOne',
      'api::action.action'
    >;
    formation: Attribute.Relation<
      'api::evaluation-stagiaire.evaluation-stagiaire',
      'manyToOne',
      'api::formation.formation'
    >;
    question_stagiaires: Attribute.Relation<
      'api::evaluation-stagiaire.evaluation-stagiaire',
      'oneToMany',
      'api::question-stagiaire.question-stagiaire'
    >;
    id_evaluation: Attribute.BigInteger;
    note: Attribute.Decimal;
    commentaire: Attribute.Text;
    user: Attribute.Relation<
      'api::evaluation-stagiaire.evaluation-stagiaire',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::evaluation-stagiaire.evaluation-stagiaire',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::evaluation-stagiaire.evaluation-stagiaire',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFinancementFinancement extends Schema.CollectionType {
  collectionName: 'financements';
  info: {
    singularName: 'financement';
    pluralName: 'financements';
    displayName: 'Financement';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    stagiaire: Attribute.Relation<
      'api::financement.financement',
      'oneToOne',
      'api::stagiaire.stagiaire'
    >;
    session: Attribute.Relation<
      'api::financement.financement',
      'oneToOne',
      'api::session.session'
    >;
    type: Attribute.Enumeration<
      [
        'Entreprise',
        'OPCO',
        'CPF',
        'Pouvoirs publics',
        'Particulier',
        'Particulier (Hors BPF)',
        'Sous-traitance'
      ]
    >;
    entreprise: Attribute.Relation<
      'api::financement.financement',
      'oneToOne',
      'api::entreprise.entreprise'
    >;
    financeur: Attribute.String;
    categorie: Attribute.Enumeration<
      [
        'Contrat d\u2019apprentissage',
        'Contrat de professionnalisation',
        'Promotion ou reconversion par alternance',
        'Projet de transition professionnelle',
        'Dispositif personnes en recherche d\u2019emploi',
        'Dispositif pour les travailleurs non-salari\u00E9s',
        'Plan de d\u00E9veloppement des comp\u00E9tences ou autres'
      ]
    >;
    montant: Attribute.Decimal;
    pouvoirs_publics: Attribute.Enumeration<
      [
        'Pour la formation de leurs agents',
        'Instances europ\u00E9ennes',
        'Etat',
        'Conseils r\u00E9gionaux',
        'France travail',
        'Autres ressources publiques'
      ]
    >;
    factured: Attribute.Boolean;
    paid: Attribute.Boolean;
    document: Attribute.Relation<
      'api::financement.financement',
      'oneToOne',
      'api::document.document'
    >;
    user: Attribute.Relation<
      'api::financement.financement',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::financement.financement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::financement.financement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFormationFormation extends Schema.CollectionType {
  collectionName: 'formations';
  info: {
    singularName: 'formation';
    pluralName: 'formations';
    displayName: 'Formation';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String;
    theme: Attribute.String;
    user: Attribute.Relation<
      'api::formation.formation',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    handicap: Attribute.Text;
    referent_pedagogique: Attribute.Relation<
      'api::formation.formation',
      'manyToOne',
      'api::rh.rh'
    >;
    referent_administratif: Attribute.Relation<
      'api::formation.formation',
      'manyToOne',
      'api::rh.rh'
    >;
    referent_handicap: Attribute.Relation<
      'api::formation.formation',
      'manyToOne',
      'api::rh.rh'
    >;
    sessions: Attribute.Relation<
      'api::formation.formation',
      'oneToMany',
      'api::session.session'
    >;
    modules: Attribute.Relation<
      'api::formation.formation',
      'oneToMany',
      'api::module.module'
    >;
    gestion_commerciales: Attribute.Relation<
      'api::formation.formation',
      'oneToMany',
      'api::gestion-commerciale.gestion-commerciale'
    >;
    actions: Attribute.Relation<
      'api::formation.formation',
      'oneToMany',
      'api::action.action'
    >;
    specialite: Attribute.String;
    certifications: Attribute.Relation<
      'api::formation.formation',
      'oneToMany',
      'api::certification.certification'
    >;
    evaluations: Attribute.Relation<
      'api::formation.formation',
      'oneToMany',
      'api::evaluation.evaluation'
    >;
    evaluation_stagiaires: Attribute.Relation<
      'api::formation.formation',
      'oneToMany',
      'api::evaluation-stagiaire.evaluation-stagiaire'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::formation.formation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::formation.formation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGestionCommercialeGestionCommerciale
  extends Schema.CollectionType {
  collectionName: 'gestion_commerciales';
  info: {
    singularName: 'gestion-commerciale';
    pluralName: 'gestion-commerciales';
    displayName: 'Gestion-commerciale';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titre: Attribute.String;
    etapes: Attribute.Enumeration<
      [
        'Prospect',
        'Premier contact',
        'Offre commerciale',
        'N\u00E9gociation',
        'Offre accept\u00E9e',
        'Offre archiv\u00E9e'
      ]
    >;
    statut: Attribute.Enumeration<
      ['En attente', 'Gagn\u00E9', 'Perdu', 'Annul\u00E9']
    >;
    rh: Attribute.Relation<
      'api::gestion-commerciale.gestion-commerciale',
      'manyToOne',
      'api::rh.rh'
    >;
    formation: Attribute.Relation<
      'api::gestion-commerciale.gestion-commerciale',
      'manyToOne',
      'api::formation.formation'
    >;
    contactNom: Attribute.String;
    contactPrenom: Attribute.String;
    contactEmail: Attribute.Email;
    contactTel: Attribute.String;
    nbStagiaires: Attribute.Integer;
    tarif: Attribute.BigInteger;
    evolution: Attribute.Text;
    notes: Attribute.Text;
    entreprise: Attribute.Relation<
      'api::gestion-commerciale.gestion-commerciale',
      'manyToOne',
      'api::entreprise.entreprise'
    >;
    apporteur: Attribute.Relation<
      'api::gestion-commerciale.gestion-commerciale',
      'manyToOne',
      'api::entreprise.entreprise'
    >;
    action: Attribute.Relation<
      'api::gestion-commerciale.gestion-commerciale',
      'oneToOne',
      'api::action.action'
    >;
    documents: Attribute.Relation<
      'api::gestion-commerciale.gestion-commerciale',
      'oneToMany',
      'api::document.document'
    >;
    user: Attribute.Relation<
      'api::gestion-commerciale.gestion-commerciale',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::gestion-commerciale.gestion-commerciale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::gestion-commerciale.gestion-commerciale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLieuLieu extends Schema.CollectionType {
  collectionName: 'lieux';
  info: {
    singularName: 'lieu';
    pluralName: 'lieux';
    displayName: 'Lieu';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    codepostal: Attribute.String;
    ville: Attribute.String;
    salle: Attribute.String;
    mode: Attribute.Enumeration<['Pr\u00E9sentiel', 'A distance']>;
    nom_outil: Attribute.String;
    url_outil: Attribute.String;
    mon_of: Attribute.Relation<
      'api::lieu.lieu',
      'manyToOne',
      'api::mon-of.mon-of'
    >;
    adresse: Attribute.String;
    user: Attribute.Relation<
      'api::lieu.lieu',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::lieu.lieu', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::lieu.lieu', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiModuleModule extends Schema.CollectionType {
  collectionName: 'modules';
  info: {
    singularName: 'module';
    pluralName: 'modules';
    displayName: 'Module';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String;
    formation: Attribute.Relation<
      'api::module.module',
      'manyToOne',
      'api::formation.formation'
    >;
    heures: Attribute.Integer;
    type_enseignement: Attribute.Enumeration<
      [
        'Pr\u00E9sentiel',
        'Distanciel',
        'E-Learning',
        'Blended Learning',
        'Action de Formation En Situation de Travail (AFEST)',
        'Stage'
      ]
    >;
    actions: Attribute.Relation<
      'api::module.module',
      'manyToMany',
      'api::action.action'
    >;
    objectifs: Attribute.RichText;
    contenu: Attribute.RichText;
    methodes_pedagogiques: Attribute.RichText;
    moyens_pedagogiques: Attribute.RichText;
    competences: Attribute.Relation<
      'api::module.module',
      'oneToMany',
      'api::competence.competence'
    >;
    user: Attribute.Relation<
      'api::module.module',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::module.module',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::module.module',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMonOfMonOf extends Schema.CollectionType {
  collectionName: 'mon_ofs';
  info: {
    singularName: 'mon-of';
    pluralName: 'mon-ofs';
    displayName: 'Mon-of';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    user: Attribute.Relation<
      'api::mon-of.mon-of',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    siret: Attribute.String;
    denomination: Attribute.String;
    adresse: Attribute.String;
    codepostal: Attribute.String;
    ville: Attribute.String;
    pays: Attribute.String;
    telephone: Attribute.String;
    website: Attribute.String;
    forme_juridique: Attribute.Enumeration<
      [
        'Entreprise Individuelle',
        'Entreprise Unipersonnelle \u00E0 Responsabilit\u00E9 Limit\u00E9e',
        'Soci\u00E9t\u00E9 \u00E0 Responsabilit\u00E9 Limit\u00E9e',
        'Soci\u00E9t\u00E9 par Actions Simplifi\u00E9e Unipersonnelle',
        'Soci\u00E9t\u00E9 par Actions Simplifi\u00E9e',
        'Soci\u00E9t\u00E9 Anonyme',
        'Soci\u00E9t\u00E9 en Nom Collectif',
        'Soci\u00E9t\u00E9 en Commandite Simple',
        'Soci\u00E9t\u00E9 en Commandite par Actions'
      ]
    >;
    codeape: Attribute.String;
    numerotva: Attribute.String;
    villeRCS: Attribute.String;
    capitalsocial: Attribute.String;
    representantnom: Attribute.String;
    representantprenom: Attribute.String;
    representantfonction: Attribute.String;
    representanttel: Attribute.String;
    representantemail: Attribute.String;
    nda: Attribute.String;
    region: Attribute.Enumeration<
      [
        'Auvergne-Rh\u00F4ne-Alpes',
        'Bourgogne-Franche-Comt\u00E9',
        'Bretagne',
        'Centre-Val de Loire',
        'Corse',
        'Grand-Est',
        'Guadeloupe',
        'Guyane',
        'Hauts-de-France',
        '\u00CEle de France',
        'La R\u00E9union',
        'Martinique',
        'Mayotte',
        'Normandie',
        'Nouvelle-Aquitaine',
        'Occitanie',
        'Pays de la Loire',
        "Provence-Alpes-C\u00F4te d'Azur"
      ]
    >;
    qualiopi: Attribute.Boolean & Attribute.DefaultTo<false>;
    tva_exoneration: Attribute.Boolean & Attribute.DefaultTo<false>;
    tva_franchise: Attribute.Boolean & Attribute.DefaultTo<false>;
    tva: Attribute.Decimal;
    jour_cloture: Attribute.Integer;
    mois_cloture: Attribute.Enumeration<
      [
        'Janvier',
        'F\u00E9vrier',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Aout',
        'Septembre',
        'Octobre',
        'Novembre',
        'D\u00E9cembre'
      ]
    >;
    codebanque: Attribute.String;
    codeguichet: Attribute.String;
    numerocompte: Attribute.String;
    clerib: Attribute.String;
    IBAN: Attribute.String;
    BIC: Attribute.String;
    documents: Attribute.Relation<
      'api::mon-of.mon-of',
      'oneToMany',
      'api::document.document'
    >;
    lieux: Attribute.Relation<
      'api::mon-of.mon-of',
      'oneToMany',
      'api::lieu.lieu'
    >;
    codeuai: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mon-of.mon-of',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mon-of.mon-of',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOffreOffre extends Schema.CollectionType {
  collectionName: 'offres';
  info: {
    singularName: 'offre';
    pluralName: 'offres';
    displayName: 'Offre';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String;
    prix: Attribute.Integer;
    users: Attribute.Relation<
      'api::offre.offre',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::offre.offre',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::offre.offre',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQuestionQuestion extends Schema.CollectionType {
  collectionName: 'questions';
  info: {
    singularName: 'question';
    pluralName: 'questions';
    displayName: 'question';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    intitule: Attribute.Text;
    type_question: Attribute.Enumeration<
      [
        'Question ouverte',
        'Question \u00E0 choix unique',
        'Question \u00E0 choix multiples'
      ]
    >;
    reponses: Attribute.Component<'question-extend.reponses', true>;
    competence: Attribute.Relation<
      'api::question.question',
      'oneToOne',
      'api::competence.competence'
    >;
    user: Attribute.Relation<
      'api::question.question',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::question.question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::question.question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQuestionStagiaireQuestionStagiaire
  extends Schema.CollectionType {
  collectionName: 'question_stagiaires';
  info: {
    singularName: 'question-stagiaire';
    pluralName: 'question-stagiaires';
    displayName: 'Question-stagiaire';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    intitule: Attribute.Text;
    type_question: Attribute.Enumeration<
      [
        'Question ouverte',
        'Question \u00E0 choix unique',
        'Question \u00E0 choix multiples'
      ]
    >;
    reponses: Attribute.Component<'reponses-stagiaire-extend.reponses', true>;
    reponse: Attribute.Component<'reponse-stagiaire-extend.reponse'>;
    correction: Attribute.Enumeration<
      ['acquis', 'partiellement acquis', 'non acquis']
    >;
    competence: Attribute.Relation<
      'api::question-stagiaire.question-stagiaire',
      'oneToOne',
      'api::competence.competence'
    >;
    user: Attribute.Relation<
      'api::question-stagiaire.question-stagiaire',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::question-stagiaire.question-stagiaire',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::question-stagiaire.question-stagiaire',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRelationEntrepriseRelationEntreprise
  extends Schema.CollectionType {
  collectionName: 'relation_entreprises';
  info: {
    singularName: 'relation-entreprise';
    pluralName: 'relation-entreprises';
    displayName: 'relation-entreprise';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    relation: Attribute.String;
    entreprises: Attribute.Relation<
      'api::relation-entreprise.relation-entreprise',
      'manyToMany',
      'api::entreprise.entreprise'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::relation-entreprise.relation-entreprise',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::relation-entreprise.relation-entreprise',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRhRh extends Schema.CollectionType {
  collectionName: 'rhs';
  info: {
    singularName: 'rh';
    pluralName: 'rhs';
    displayName: 'Rh';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String;
    prenom: Attribute.String;
    email: Attribute.Email;
    qualification: Attribute.String;
    user: Attribute.Relation<
      'api::rh.rh',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    pedagogique: Attribute.Relation<
      'api::rh.rh',
      'oneToMany',
      'api::formation.formation'
    >;
    administratif: Attribute.Relation<
      'api::rh.rh',
      'oneToMany',
      'api::formation.formation'
    >;
    handicap: Attribute.Relation<
      'api::rh.rh',
      'oneToMany',
      'api::formation.formation'
    >;
    roles: Attribute.Relation<
      'api::rh.rh',
      'manyToMany',
      'api::rh-role.rh-role'
    >;
    telephone: Attribute.String;
    subordination: Attribute.Enumeration<
      ['dirigeant', 'salari\u00E9', 'sous-traitant']
    >;
    adresse: Attribute.Text;
    competences: Attribute.String;
    geographie: Attribute.String;
    secusociale: Attribute.String;
    entreprise: Attribute.Relation<
      'api::rh.rh',
      'manyToOne',
      'api::entreprise.entreprise'
    >;
    civilite: Attribute.Enumeration<['Monsieur', 'Madame']>;
    codepostal: Attribute.String;
    ville: Attribute.String;
    pays: Attribute.String & Attribute.DefaultTo<'FRANCE'>;
    dates_modules_matin: Attribute.Relation<
      'api::rh.rh',
      'oneToMany',
      'api::dates-module.dates-module'
    >;
    dates_modules_apresmidi: Attribute.Relation<
      'api::rh.rh',
      'oneToMany',
      'api::dates-module.dates-module'
    >;
    sessions: Attribute.Relation<
      'api::rh.rh',
      'oneToMany',
      'api::session.session'
    >;
    veilles: Attribute.Relation<
      'api::rh.rh',
      'oneToMany',
      'api::veille.veille'
    >;
    gestion_commerciales: Attribute.Relation<
      'api::rh.rh',
      'oneToMany',
      'api::gestion-commerciale.gestion-commerciale'
    >;
    emails: Attribute.Relation<'api::rh.rh', 'oneToMany', 'api::email.email'>;
    documents: Attribute.Relation<
      'api::rh.rh',
      'oneToMany',
      'api::document.document'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::rh.rh', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::rh.rh', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiRhRoleRhRole extends Schema.CollectionType {
  collectionName: 'rh_roles';
  info: {
    singularName: 'rh-role';
    pluralName: 'rh-roles';
    displayName: 'rh-role';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    role: Attribute.String;
    rhs: Attribute.Relation<'api::rh-role.rh-role', 'manyToMany', 'api::rh.rh'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::rh-role.rh-role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::rh-role.rh-role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSessionSession extends Schema.CollectionType {
  collectionName: 'sessions';
  info: {
    singularName: 'session';
    pluralName: 'sessions';
    displayName: 'Session';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String;
    formation: Attribute.Relation<
      'api::session.session',
      'manyToOne',
      'api::formation.formation'
    >;
    nb_stagiaires_min: Attribute.Integer;
    nb_stagiaires_max: Attribute.Integer;
    statut: Attribute.Enumeration<
      [
        'En projet',
        'Confirm\u00E9e',
        'En cours',
        'R\u00E9alis\u00E9e',
        'Annul\u00E9e',
        'Archiv\u00E9e'
      ]
    >;
    responsable: Attribute.Relation<
      'api::session.session',
      'manyToOne',
      'api::rh.rh'
    >;
    type: Attribute.Enumeration<
      ['Inter-Entreprise', 'Intra-Entreprise', 'Individuel']
    >;
    inclus_bpf: Attribute.Boolean & Attribute.DefaultTo<true>;
    en_soustraitance: Attribute.Boolean & Attribute.DefaultTo<false>;
    nature_action: Attribute.Enumeration<
      [
        'Action de formation',
        'Bilan de comp\u00E9tences',
        "Action de validation des acquis de l'exp\u00E9rience",
        'Action de formation par apprentissage'
      ]
    >;
    startDate: Attribute.DateTime;
    endDate: Attribute.DateTime;
    modu: Attribute.Component<'session-extend.session1', true>;
    session_stagiaires: Attribute.Component<'session-extend.session2', true>;
    action: Attribute.Relation<
      'api::session.session',
      'manyToOne',
      'api::action.action'
    >;
    emails: Attribute.Relation<
      'api::session.session',
      'oneToMany',
      'api::email.email'
    >;
    evaluation_stagiaires: Attribute.Relation<
      'api::session.session',
      'oneToMany',
      'api::evaluation-stagiaire.evaluation-stagiaire'
    >;
    eval: Attribute.Component<'session-extend.session-evaluations', true>;
    veilles: Attribute.Relation<
      'api::session.session',
      'oneToMany',
      'api::veille.veille'
    >;
    documents: Attribute.Relation<
      'api::session.session',
      'oneToMany',
      'api::document.document'
    >;
    stagiaires_abandon: Attribute.Component<
      'session-extend.stagiaires-abandon',
      true
    >;
    user: Attribute.Relation<
      'api::session.session',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::session.session',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::session.session',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStagiaireStagiaire extends Schema.CollectionType {
  collectionName: 'stagiaires';
  info: {
    singularName: 'stagiaire';
    pluralName: 'stagiaires';
    displayName: 'Stagiaire';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nom: Attribute.String;
    prenom: Attribute.String;
    adresse: Attribute.String;
    telephone: Attribute.String;
    email: Attribute.Email;
    civilite: Attribute.Enumeration<['Monsieur', 'Madame']>;
    date_naissance: Attribute.DateTime;
    codepostal: Attribute.String;
    ville: Attribute.String;
    pays: Attribute.String & Attribute.DefaultTo<'FRANCE'>;
    stagiaire_formations: Attribute.Component<
      'stagiaire-extend.stagiaire1',
      true
    >;
    uuid: Attribute.String;
    emails: Attribute.Relation<
      'api::stagiaire.stagiaire',
      'oneToMany',
      'api::email.email'
    >;
    evaluation_stagiaires: Attribute.Relation<
      'api::stagiaire.stagiaire',
      'oneToMany',
      'api::evaluation-stagiaire.evaluation-stagiaire'
    >;
    documents: Attribute.Relation<
      'api::stagiaire.stagiaire',
      'oneToMany',
      'api::document.document'
    >;
    dates_modules: Attribute.Relation<
      'api::stagiaire.stagiaire',
      'manyToMany',
      'api::dates-module.dates-module'
    >;
    sessions_abandonnees: Attribute.Relation<
      'api::stagiaire.stagiaire',
      'oneToMany',
      'api::session.session'
    >;
    user: Attribute.Relation<
      'api::stagiaire.stagiaire',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::stagiaire.stagiaire',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::stagiaire.stagiaire',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVeilleVeille extends Schema.CollectionType {
  collectionName: 'veilles';
  info: {
    singularName: 'veille';
    pluralName: 'veilles';
    displayName: 'Veille';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    type: Attribute.String;
    statut: Attribute.Enumeration<
      ['A traiter', 'En cours', 'Cl\u00F4tur\u00E9']
    >;
    gravite: Attribute.Enumeration<['Faible', 'Moyenne', 'Elev\u00E9e']>;
    description: Attribute.Text;
    action_menee: Attribute.Text;
    date_ouverture: Attribute.DateTime;
    date_cloture: Attribute.DateTime;
    origine: Attribute.Text;
    responsable: Attribute.Relation<
      'api::veille.veille',
      'manyToOne',
      'api::rh.rh'
    >;
    article: Attribute.Relation<
      'api::veille.veille',
      'manyToOne',
      'api::article.article'
    >;
    session: Attribute.Relation<
      'api::veille.veille',
      'manyToOne',
      'api::session.session'
    >;
    user: Attribute.Relation<
      'api::veille.veille',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::veille.veille',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::veille.veille',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVeilleMetierVeilleMetier extends Schema.CollectionType {
  collectionName: 'veille_metiers';
  info: {
    singularName: 'veille-metier';
    pluralName: 'veille-metiers';
    displayName: 'Veille-metier';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    user: Attribute.Relation<
      'api::veille-metier.veille-metier',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::veille-metier.veille-metier',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::veille-metier.veille-metier',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::action.action': ApiActionAction;
      'api::article.article': ApiArticleArticle;
      'api::certification.certification': ApiCertificationCertification;
      'api::competence.competence': ApiCompetenceCompetence;
      'api::dates-module.dates-module': ApiDatesModuleDatesModule;
      'api::document.document': ApiDocumentDocument;
      'api::documents-template.documents-template': ApiDocumentsTemplateDocumentsTemplate;
      'api::email.email': ApiEmailEmail;
      'api::entreprise.entreprise': ApiEntrepriseEntreprise;
      'api::evaluation.evaluation': ApiEvaluationEvaluation;
      'api::evaluation-stagiaire.evaluation-stagiaire': ApiEvaluationStagiaireEvaluationStagiaire;
      'api::financement.financement': ApiFinancementFinancement;
      'api::formation.formation': ApiFormationFormation;
      'api::gestion-commerciale.gestion-commerciale': ApiGestionCommercialeGestionCommerciale;
      'api::lieu.lieu': ApiLieuLieu;
      'api::module.module': ApiModuleModule;
      'api::mon-of.mon-of': ApiMonOfMonOf;
      'api::offre.offre': ApiOffreOffre;
      'api::question.question': ApiQuestionQuestion;
      'api::question-stagiaire.question-stagiaire': ApiQuestionStagiaireQuestionStagiaire;
      'api::relation-entreprise.relation-entreprise': ApiRelationEntrepriseRelationEntreprise;
      'api::rh.rh': ApiRhRh;
      'api::rh-role.rh-role': ApiRhRoleRhRole;
      'api::session.session': ApiSessionSession;
      'api::stagiaire.stagiaire': ApiStagiaireStagiaire;
      'api::veille.veille': ApiVeilleVeille;
      'api::veille-metier.veille-metier': ApiVeilleMetierVeilleMetier;
    }
  }
}
