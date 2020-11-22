package com.order.api.admin;

import com.order.dto.DishCategoryDTO;
import com.order.dto.DishDTO;
import com.order.dto.ServiceResult;
import com.order.processor.DishCategoryProcessor;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dish-category")
@AllArgsConstructor
public class DishCategoryApi {
    private DishCategoryProcessor dishCategoryProcessor;

    @PostMapping
    public ResponseEntity<ServiceResult> createDishCategory(@RequestBody DishCategoryDTO dishCategoryDTO) {
        dishCategoryProcessor.createDishCategory(dishCategoryDTO);
        return new ResponseEntity<>(new ServiceResult("success", "200"), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<ServiceResult> updateDishCategory(@RequestBody DishCategoryDTO dishCategoryDTO) {
        dishCategoryProcessor.changeDishCategory(dishCategoryDTO);
        return new ResponseEntity<>(new ServiceResult("success", "200"), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<ServiceResult> deleteDishCategory(@RequestParam(name = "id") Long id) {
        dishCategoryProcessor.deleteDishCategory(id);
        return new ResponseEntity<>(new ServiceResult("success", "200"), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ServiceResult> getDishCategory(@RequestParam(name = "id") Long id) {
        return new ResponseEntity<>(new ServiceResult(dishCategoryProcessor.getCategoryDish(id), "success", "200"), HttpStatus.OK);
    }
    @PostMapping("/delete")
    public ResponseEntity<ServiceResult> deleteDish(@RequestBody DishCategoryDTO dishCategoryDTO) {
        dishCategoryProcessor.deleteListDish(dishCategoryDTO);
        return new ResponseEntity<>(new ServiceResult("success", "200"), HttpStatus.OK);
    }
    @PostMapping("/list")
    public ResponseEntity<ServiceResult> getListDishCategory(@RequestBody DishCategoryDTO dishCategoryDTO,
                                                     @RequestParam(name = "page", defaultValue = "1", required = false) Integer currentPage,
                                                     @RequestParam(name = "size", defaultValue = "10", required = false) Integer size) {
        Pageable pageable = PageRequest.of(currentPage > 0 ? currentPage - 1 : currentPage, size);
        Long totalItem = dishCategoryProcessor.countListDishCategory(dishCategoryDTO);
        Integer totalPage = (int) Math.ceil((double) totalItem / size);
        List<DishCategoryDTO> listData = dishCategoryProcessor.getListDish(dishCategoryDTO, pageable);
        ServiceResult serviceResult = new ServiceResult(listData, totalPage, currentPage);
        return ResponseEntity.ok(serviceResult);
    }
}
