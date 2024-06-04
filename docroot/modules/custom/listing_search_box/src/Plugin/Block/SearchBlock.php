<?php

namespace Drupal\listing_search_box\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a 'SearchBlock' block.
 *
 * @Block(
 *   id = "listing_search_block",
 *   admin_label = @Translation("Listing Search Block"),
 * )
 */
class SearchBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $form = \Drupal::formBuilder()->getForm('Drupal\listing_search_box\Form\SearchBlockForm');
    return [
      '#attached' => [
        'library' => [
          'listing_search_box/listing_search_box',
        ],
      ],
      $form,
    ];  }

}
