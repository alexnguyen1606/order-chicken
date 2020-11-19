package com.order.api.admin;

import com.order.dto.DishDTO;
import com.order.dto.ServiceResult;
import com.order.processor.DishProcessor;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dish")
@AllArgsConstructor
public class DishApi {
    private DishProcessor dishProcessor;

    @PostMapping
    public ResponseEntity<ServiceResult> createDish(@RequestBody DishDTO dishDTO) {
        dishProcessor.createDish(dishDTO);
        return new ResponseEntity<>(new ServiceResult("success", "200"), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<ServiceResult> updateDish(@RequestBody DishDTO dishDTO) {
        dishProcessor.changeDish(dishDTO);
        return new ResponseEntity<>(new ServiceResult("success", "200"), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<ServiceResult> deleteDish(@RequestParam(name = "id") Long id) {
        dishProcessor.deleteDish(id);
        return new ResponseEntity<>(new ServiceResult("success", "200"), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ServiceResult> getDish(@RequestParam(name = "id") Long id) {
        return new ResponseEntity<>(new ServiceResult(dishProcessor.getDish(id), "success", "200"), HttpStatus.OK);
    }
    @PostMapping("/delete")
    public ResponseEntity<ServiceResult> deleteDish(@RequestBody DishDTO dishDTO) {
        if (dishDTO.getIds() != null) {
            dishProcessor.deleteDishes(dishDTO.getIds());

        }
        return new ResponseEntity<>(new ServiceResult("success", "200"), HttpStatus.OK);
    }

    @PostMapping("/list")
    public ResponseEntity<ServiceResult> getListDish(@RequestBody DishDTO dishDTO,
                                                     @RequestParam(name = "page", defaultValue = "1", required = false) Integer currentPage,
                                                     @RequestParam(name = "size", defaultValue = "10", required = false) Integer size) {
        Pageable pageable = PageRequest.of(currentPage > 0 ? currentPage - 1 : currentPage, size);
        Long totalItem = dishProcessor.countListDish(dishDTO);
        Integer totalPage = (int) Math.ceil((double) totalItem / size);
        List<DishDTO> listData = dishProcessor.getListDish(dishDTO, pageable);
        ServiceResult serviceResult = new ServiceResult(listData, totalPage, currentPage);
        return ResponseEntity.ok(serviceResult);
    }
}
