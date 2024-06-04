<?php

namespace Drupal\listing_search_box\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Render\RendererInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\node\Entity\Node;

class SearchResultsController extends ControllerBase
{

  /**
   * The renderer service.
   *
   * @var RendererInterface
   */
  protected RendererInterface $renderer;

  /**
   * Constructs a new SearchResultsController.
   *
   * @param RendererInterface $renderer
   *   The renderer service.
   */
  public function __construct(RendererInterface $renderer) {
    $this->renderer = $renderer;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('renderer')
    );
  }


  /**
   * @throws Exception
   */
  public function results($category, $region, $title = ''): array
  {
    // Convert 'all' or empty strings to NULL to handle the query properly.
    $region = ($region !== 'all' && $region !== '') ? $region : NULL;
    $category = ($category !== 'all' && $category !== '') ? $category : NULL;
    $title = ($title !== '') ? $title : NULL;

    // Build the query to fetch tour nodes based on selected categories and title.
    $query = \Drupal::entityQuery('node')
      ->condition('type', 'listing')  // Assuming 'tour' is the content type.
      ->accessCheck(FALSE);

    if ($region) {
      $query->condition('field_listing_location', $region);
    }
    if ($category) {
      $query->condition('field_listing_category', $category);
    }
    if ($title) {
      $query->condition('title', '%' . $title . '%', 'LIKE');
    }

    $nids = $query->execute();

    // Load the nodes.
    $nodes = Node::loadMultiple($nids);

    // Build render array for the results.
    $items = [];
    foreach ($nodes as $node) {
      $view = $this->entityTypeManager()->getViewBuilder('node')->view($node, 'teaser');
      $items[] = ['content' => $this->renderer->render($view)];

    }

    // Return the render array.
    return [
      '#theme' => 'listing_search_results',
      '#items' => $items,
      '#attached' => [
        'library' => [
          'core/drupal.ajax',
        ],
      ],
    ];
  }
}
