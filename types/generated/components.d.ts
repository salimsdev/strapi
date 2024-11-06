import type { Schema, Attribute } from '@strapi/strapi';

export interface EvaluationExtendQuestions extends Schema.Component {
  collectionName: 'components_evaluation_extend_questions';
  info: {
    displayName: 'questions';
  };
  attributes: {
    intitule: Attribute.String;
  };
}

export interface QuestionExtendReponses extends Schema.Component {
  collectionName: 'components_question_extend_reponses';
  info: {
    displayName: 'reponses';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    correct: Attribute.Boolean;
  };
}

export interface ReponseStagiaireExtendReponse extends Schema.Component {
  collectionName: 'components_reponse_stagiaire_extend_reponses';
  info: {
    displayName: 'reponse';
  };
  attributes: {
    textAnswer: Attribute.Text;
  };
}

export interface ReponsesStagiaireExtendReponses extends Schema.Component {
  collectionName: 'components_reponses_stagiaire_extend_reponses';
  info: {
    displayName: 'reponses';
  };
  attributes: {
    text: Attribute.String;
    checked: Attribute.Boolean;
    correct: Attribute.Boolean;
  };
}

export interface SessionExtendSessionEvaluations extends Schema.Component {
  collectionName: 'components_session_extend_eval';
  info: {
    displayName: 'eval';
    description: '';
  };
  attributes: {
    evaluation: Attribute.Relation<
      'session-extend.session-evaluations',
      'oneToOne',
      'api::evaluation.evaluation'
    >;
    published: Attribute.Boolean;
  };
}

export interface SessionExtendSession1 extends Schema.Component {
  collectionName: 'components_session_extend_session1s';
  info: {
    displayName: 'Session1';
    description: '';
  };
  attributes: {
    module: Attribute.Relation<
      'session-extend.session1',
      'oneToOne',
      'api::module.module'
    >;
    dates_modules: Attribute.Relation<
      'session-extend.session1',
      'oneToMany',
      'api::dates-module.dates-module'
    >;
    selectTypeDate: Attribute.Enumeration<
      ['Entrer un intervalle de dates', 'S\u00E9lectionner toutes les dates']
    >;
    startInterval: Attribute.DateTime;
    endInterval: Attribute.DateTime;
    gestionFormateurs: Attribute.Enumeration<['un', 'plusieurs']>;
    rh: Attribute.Relation<'session-extend.session1', 'oneToOne', 'api::rh.rh'>;
    rhs: Attribute.Relation<
      'session-extend.session1',
      'oneToMany',
      'api::rh.rh'
    >;
    stagiaires_presents: Attribute.Relation<
      'session-extend.session1',
      'oneToMany',
      'api::stagiaire.stagiaire'
    >;
    documents: Attribute.Relation<
      'session-extend.session1',
      'oneToMany',
      'api::document.document'
    >;
    lieu: Attribute.Relation<
      'session-extend.session1',
      'oneToOne',
      'api::lieu.lieu'
    >;
  };
}

export interface SessionExtendSession2 extends Schema.Component {
  collectionName: 'components_session_extend_session2s';
  info: {
    displayName: 'Session2';
    description: '';
  };
  attributes: {
    stagiaires: Attribute.Relation<
      'session-extend.session2',
      'oneToMany',
      'api::stagiaire.stagiaire'
    >;
    modules: Attribute.Relation<
      'session-extend.session2',
      'oneToMany',
      'api::module.module'
    >;
    stagFormId: Attribute.String;
    attentes: Attribute.Text;
    solutions: Attribute.Text;
    entreprise: Attribute.Relation<
      'session-extend.session2',
      'oneToOne',
      'api::entreprise.entreprise'
    >;
    tarif: Attribute.Decimal;
    statut: Attribute.Enumeration<
      ['Prospect', 'Accept\u00E9', 'Sign\u00E9', 'Paiement re\u00E7u']
    >;
  };
}

export interface SessionExtendStagiairesAbandon extends Schema.Component {
  collectionName: 'components_session_extend_stagiaires_abandons';
  info: {
    displayName: 'stagiaires-abandon';
    description: '';
  };
  attributes: {
    stagiaire: Attribute.Relation<
      'session-extend.stagiaires-abandon',
      'oneToOne',
      'api::stagiaire.stagiaire'
    >;
    raison: Attribute.String;
  };
}

export interface StagiaireExtendStagiaire1 extends Schema.Component {
  collectionName: 'components_stagiaire_extend_stagiaire1s';
  info: {
    displayName: 'stagiaire1';
    icon: 'book-reader';
    description: '';
  };
  attributes: {
    formation: Attribute.Relation<
      'stagiaire-extend.stagiaire1',
      'oneToOne',
      'api::formation.formation'
    >;
    statut_formation: Attribute.Enumeration<
      [
        'Prospect',
        'Formation accept\u00E9e',
        'Formation programm\u00E9e',
        'Formation en cours',
        'Formation abandonn\u00E9e',
        'Formation r\u00E9alis\u00E9e'
      ]
    >;
    type: Attribute.String;
    entreprise: Attribute.Relation<
      'stagiaire-extend.stagiaire1',
      'oneToOne',
      'api::entreprise.entreprise'
    >;
    session: Attribute.Relation<
      'stagiaire-extend.stagiaire1',
      'oneToOne',
      'api::session.session'
    >;
    inscription: Attribute.DateTime;
    action: Attribute.Relation<
      'stagiaire-extend.stagiaire1',
      'oneToOne',
      'api::action.action'
    >;
    modules: Attribute.Relation<
      'stagiaire-extend.stagiaire1',
      'oneToMany',
      'api::module.module'
    >;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'evaluation-extend.questions': EvaluationExtendQuestions;
      'question-extend.reponses': QuestionExtendReponses;
      'reponse-stagiaire-extend.reponse': ReponseStagiaireExtendReponse;
      'reponses-stagiaire-extend.reponses': ReponsesStagiaireExtendReponses;
      'session-extend.session-evaluations': SessionExtendSessionEvaluations;
      'session-extend.session1': SessionExtendSession1;
      'session-extend.session2': SessionExtendSession2;
      'session-extend.stagiaires-abandon': SessionExtendStagiairesAbandon;
      'stagiaire-extend.stagiaire1': StagiaireExtendStagiaire1;
    }
  }
}
