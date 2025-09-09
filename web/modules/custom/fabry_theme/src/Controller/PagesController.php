<?php

namespace Drupal\fabry_theme\Controller;

use Drupal\Core\Controller\ControllerBase;

class PagesController extends ControllerBase {

  public function page() {
    return [
      '#theme' => 'page', // uses "page.html.twig"
    ];
  }

  public function understanding() {
    return [
      '#title' => Markup::create('Understanding Page'),
      '#theme' => 'page__understanding', // uses "pages/understanding.html.twig"
    ];
  }
  public function investigate() {
    return [
      '#title' => Markup::create('investigate Page'),
      '#theme' => 'page__investigate', // uses "pages/investigate.html.twig"
    ];
  }
  public function prevalence() {
    return [
      '#title' => Markup::create('prevalence Page'),
      '#theme' => 'page__prevalence', // uses "pages/prevalence.html.twig"
    ];
  }

  public function manisfestation() {
    return [
      '#title' => Markup::create('manisfestation Page'),
      '#theme' => 'page__manisfestation', // uses "pages/manisfestation.html.twig"
    ];
  }

  public function orgaos() {
    return [
      '#title' => Markup::create('orgaos Page'),
      '#theme' => 'page__orgaos', // uses "pages/orgaos.html.twig"
    ];
  }

  public function diagnosis() {
    return [
      '#title' => Markup::create('diagnosis Page'),
      '#theme' => 'page__diagnosis', // uses "pages/diagnosis.html.twig"
    ];
  }

  public function treatment() {
    return [
      '#title' => Markup::create('treatment Page'),
      '#theme' => 'page__treatment', // uses "pages/treatment.html.twig"
    ];
  }

  public function references() {
    return [
      '#title' => Markup::create('references Page'),
      '#theme' => 'page__references', // uses "pages/references.html.twig"
    ];
  }

  public function support() {
    return [
      '#title' => Markup::create('support Page'),
      '#theme' => 'page__support', // uses "pages/support.html.twig"
    ];
  }
}
   