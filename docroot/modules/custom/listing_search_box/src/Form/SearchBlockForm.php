<?php

namespace Drupal\listing_search_box\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\taxonomy\Entity\Term;

/**
 * Provides a Search Block Form.
 */
class SearchBlockForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string
  {
    return 'listing_search_block_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state): array
  {

    // Load taxonomy terms for regions and categories
    $regions = $this->getTaxonomyTerms('listing_locations');  // Replace 'regions' with your vocabulary machine name
    $categories = $this->getTaxonomyTerms('listing_category');  // Replace 'categories' with your vocabulary machine name

    $form['region'] = [
      '#type' => 'select',
      '#title' => $this->t('همه مناطق'),
      '#options' => ['all' => $this->t('همه مناطق')] + $regions,
    ];

    $form['category'] = [
      '#type' => 'select',
      '#title' => $this->t('همه دسته‌بندی ها'),
      '#options' => ['all' => $this->t('همه دسته‌بندی ها')] + $categories,
    ];

    $form['title'] = [
      '#type' => 'textfield',
      '#title' => $this->t('جستجوی عنوان'),
    ];

    $form['actions'] = [
      '#type' => 'submit',
      '#value' => $this->t('اعمال'),
      '#attributes' => ['class' => ['green-button']],
    ];

//    $form['#action'] = '/listings-result';

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void
  {

    $params = [];

    if ($form_state->getValue('region')) {
      $params['region'] = $form_state->getValue('region');
    }else{
      $params['region'] = 'all';
    }
    if ($form_state->getValue('category')) {
      $params['category'] = $form_state->getValue('category');
    }else{
      $params['category'] = 'all';
    }
    if ($form_state->getValue('title')) {
      $params['title'] = $form_state->getValue('title');
    }else{
      $params['title'] = '';
    }

    $url = \Drupal\Core\Url::fromRoute('listing_search_box.results', $params);
    $form_state->setRedirectUrl($url);
  }

  /**
   * Helper function to get taxonomy terms.
   */
  private function getTaxonomyTerms($vocabulary): array
  {
    $terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree($vocabulary);
    $options = [];
    foreach ($terms as $term) {
      $options[$term->tid] = $term->name;
    }
    return $options;
  }

}
